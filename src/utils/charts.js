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
      totalCURRENCY = 0;

    holdingAccumMap.forEach((value, key) => {
      // key like "VUAA.LON" , value is {avrgUsd:111, avrgCurrency:222, quantity:333 }
      const monthPrice = StockDataMapMonth.get(key).get(
        format(date, "yyyy-MMM")
      );
      try {
        totalUSD +=
          (monthPrice.close_prices["USD"] - value.avrgUsd) * value.quantity;
        totalCURRENCY +=
          (monthPrice.close_prices[currency] - value.avrgCurrency) *
          value.quantity;
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

    totalUSD = parseFloat(totalUSD.toFixed(2));
    totalCURRENCY = parseFloat(totalCURRENCY.toFixed(2));

    return {
      label: format(date, "yyyy-MMM"),
      totalUSD,
      totalCURRENCY,
    };
  });

  return result;
}

//console.log(getHoldingsMonthChart(holdings, stockData, "PLN"));

/*
const holdMap = new Map();
const vuaaData = {
  id: 2,
  quantity: 13,
  start_date: "2022-12-07",
  start_price_currencies: {
    EUR: 69.28,
    GBP: 59.86,
    PLN: 325.61,
    USD: 72.94,
  },
  stock: {
    symbol: "VUAA.LON",
  },
};
holdMap.set("VUAA", vuaaData);

console.log(holdMap.get("VUAA"));
*/

/*
const stockData = [
  {
    id: 1,
    symbol: "VUAA.LON",
    currency: "USD",
    monthly_data: {
      "2019-06-28": {
        "3. low": "48.5700",
        "1. open": "48.5700",
        "2. high": "52.2850",
        "4. close": "51.8300",
        "5. volume": "27030",
        close_prices: {
          EUR: 45.544,
          GBP: 40.833,
          PLN: 193.55,
          USD: 51.83,
        },
      },
      "2019-07-31": {
.....
];
*/
/*
const holdings = [
  {
    id: 7,
    quantity: 12,
    start_date: "2022-06-07",
    start_price_currencies: {
      EUR: 71.476,
      GBP: 61.388,
      PLN: 335.26,
      USD: 75.2,
    },
    stock: {
      symbol: "VUAA.LON",
    },
  }
];
*/
