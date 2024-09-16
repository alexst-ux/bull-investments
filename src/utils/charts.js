import { eachMonthOfInterval, format, isSameMonth } from "date-fns";

/* return Map with Symbol keys and values as Map of keys "yyyy-MM" and value close_prices: {EUR: 20, GBP: 17, PLN: 88, USD: 22}  */
function getStockDataMapMonth(stockData) {
  /*symbol: "VUAA.LON",
    currency: "USD",
    monthly_data: {
      "2019-06-28": { */
  const stockDataMapMonth = new Map();

  stockData.map((sd) => {
    const monthMap = new Map();
    for (const [key, value] of Object.entries(sd["monthly_data"])) {
      monthMap.set(format(new Date(key), "yyyy-MMM"), {
        close_prices: value.close_prices,
      });
    }
    stockDataMapMonth.set(sd.symbol, monthMap);
    return null;
  });

  return stockDataMapMonth;
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

    holdOnMonth.map((hom2) => {
      const acc = holdingAccumMap.get(hom2.stock.symbol) || {};
      if (!acc.quantity) {
        acc.avrgUsd = hom2.start_price_currencies.USD;
        acc.avrgCurrency = hom2.start_price_currencies[currency];
        acc.quantity = hom2.quantity;
      } else {
        const newQuantity = hom2.quantity + acc.quantity;
        acc.avrgUsd =
          (acc.avrgUsd * acc.quantity +
            hom2.start_price_currencies.USD * hom2.quantity) /
          newQuantity;
        acc.avrgCurrency =
          (acc.avrgCurrency * acc.quantity +
            hom2.start_price_currencies[currency] * hom2.quantity) /
          newQuantity;
        acc.quantity = newQuantity;
      }
      holdingAccumMap.set(hom2.stock.symbol, acc);
      return null;
    });

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
