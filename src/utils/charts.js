import { eachMonthOfInterval, format, isSameMonth } from "date-fns";

/**
 * 
 * @param {JSON} stockData is array of stocks, etc {
 *  symbol: "VUAA.LON",
    currency: "USD",
    monthly_data: {
      "2019-06-28": { ...}
      }
    }
 * @returns Map with Symbol as key and values as Map of keys "yyyy-MM" and value close_prices: {EUR: 20, GBP: 17, PLN: 88, USD: 22}
 */
function getStockDataMapMonth(stockData) {
  return new Map(
    stockData.map((sd) => [
      sd.symbol,
      new Map(
        Object.entries(sd.monthly_data).map(([key, value]) => [
          format(new Date(key), "yyyy-MMM"),
          { close_prices: value.close_prices },
        ])
      ),
    ])
  );
}

/*
  returns object { label: "dd/MMM/yyyy", totalUSD: amountUSD, totalCURRENCY: amountCurrency }
*/
export function getHoldingsMonthChart(holdings, stockData, currency) {
  const StockDataMapMonth = getStockDataMapMonth(stockData);
  const holdingAccumMap = new Map();

  const allDates = eachMonthOfInterval({
    start: new Date(holdings[0]["start_date"]),
    end: new Date(),
  });

  const result = allDates.map((date) => {
    const holdOnMonth = holdings.filter((hom) =>
      isSameMonth(date, new Date(hom.start_date))
    );

    holdOnMonth.forEach(
      ({ stock: { symbol }, start_price_currencies, quantity }) => {
        const acc = holdingAccumMap.get(symbol) || {
          quantity: 0,
          avrgUsd: 0,
          avrgCurrency: 0,
        };

        const newQuantity = quantity + acc.quantity;
        const weight = quantity / newQuantity;

        acc.avrgUsd =
          acc.avrgUsd * (1 - weight) + start_price_currencies.USD * weight;
        acc.avrgCurrency =
          acc.avrgCurrency * (1 - weight) +
          start_price_currencies[currency] * weight;
        acc.quantity = newQuantity;

        holdingAccumMap.set(symbol, acc);
      }
    );

    let totalUSD = 0,
      totalCURRENCY = 0,
      avrgUSD = 0,
      closedUSD = 0,
      closedCURRENCY = 0,
      avrgCURRENCY = 0;

    holdingAccumMap.forEach((value, key) => {
      // key like "VUAA.LON" , value is {avrgUsd:111, avrgCurrency:222, quantity:333 }
      const monthPrice = StockDataMapMonth.get(key).get(
        format(date, "yyyy-MMM")
      );
      try {
        closedUSD += monthPrice.close_prices["USD"] * value.quantity;
        avrgUSD += value.avrgUsd * value.quantity;

        closedCURRENCY += monthPrice.close_prices[currency] * value.quantity;
        avrgCURRENCY += value.avrgCurrency * value.quantity;
        /*
        totalUSD +=
          (monthPrice.close_prices["USD"] - value.avrgUsd) * value.quantity;
        totalCURRENCY +=
          (monthPrice.close_prices[currency] - value.avrgCurrency) *
          value.quantity;
        */
      } catch (e) {
        console.log(
          e.message,
          monthPrice,
          key,
          format(date, "yyyy-MMM"),
          totalUSD
        );
      }
    });

    totalUSD = parseFloat((closedUSD - avrgUSD).toFixed(2));
    totalCURRENCY = parseFloat((closedCURRENCY - avrgCURRENCY).toFixed(2));

    return {
      label: format(date, "yyyy-MMM"),
      totalUSD,
      totalCURRENCY,
      totalPercentUSD: parseFloat(
        (((closedUSD - avrgUSD) * 100) / avrgUSD).toFixed(2)
      ),
      totalPercentCURRENCY: parseFloat(
        (((closedCURRENCY - avrgCURRENCY) * 100) / avrgCURRENCY).toFixed(2)
      ),
    };
  });

  return result;
}

//console.log(getHoldingsMonthChart(holdings, stockData, "PLN"));
