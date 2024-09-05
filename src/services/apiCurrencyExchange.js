/* import { DTLA_LON } from "../data/data_DTLA";
import { IWDA_AMS } from "../data/data_IWDA_AMS";
import { SWRD_AMS } from "../data/data_SWRD";
import { VUAA_LON } from "../data/data_VUAA";
import { VUAA_DEX } from "../data/data_VUAA_DEX";
import { SXR8_DEX } from "../data/data_SXR8_DEX"; */

export const BASE_CURRENCIES = ["USD", "EUR", "PLN", "GBP"];

export async function getAllCurrencyExchange(date, price, baseCurrency) {
  const fetchURLPromises = BASE_CURRENCIES.filter(
    (val) => val !== baseCurrency
  ).map((cur) =>
    fetch(
      `https://api.frankfurter.app/${date}?from=${baseCurrency}&to=${cur}&amount=${price}`
    )
  );

  const result = await Promise.all(fetchURLPromises)
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => {
      return data.reduce((acc, cur) => {
        acc[cur.base] = cur.amount;
        acc[Object.keys(cur.rates).at(0)] =
          cur.rates[Object.keys(cur.rates).at(0)];
        return acc;
      }, {});
    })
    .catch((error) => {
      console.error("Error getAllCurrencyExchange data:", error);
    });

  return result;
}
/*
const exResult = await getAllCurrencyExchange("2024-08-31", 34.715, "EUR");
console.log(JSON.stringify(exResult));
*/
//----------------------------------------------------------------------------------

export async function getHistoryExchData(stockData, currency) {
  if (!stockData) stockData = "" /* SXR8_DEX */;
  for (const [key, value] of Object.entries(stockData["Monthly Time Series"])) {
    const exResult = await getAllCurrencyExchange(
      key,
      value["4. close"],
      currency
    );
    stockData["Monthly Time Series"][key].close_prices = exResult;
  }

  console.log(JSON.stringify(stockData));
}

//getHistoryExchData(SXR8_DEX, "EUR"); // then so JSON.stringify in dev tool because quokka does not show all data
//getHistoryExchData(DTLA, "USD"); // then so JSON.stringify in dev tool because quokka does not show all data
