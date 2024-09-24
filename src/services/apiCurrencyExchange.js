/* import { DTLA_LON } from "../data/data_DTLA";
import { IWDA_AMS } from "../data/data_IWDA_AMS";
import { SWRD_AMS } from "../data/data_SWRD";
import { VUAA_LON } from "../data/data_VUAA";
import { VUAA_DEX } from "../data/data_VUAA_DEX";
import { SXR8_DEX } from "../data/data_SXR8_DEX"; */

import { BASE_CURRENCIES } from "../utils/currencyFormat";

/**
 * 
 * @param {string} date as a string YYYY-MM-DD, as "2024-01-31"
 * @param {number} price 
 * @param {string} baseCurrency 
 * @returns Object with currency exchange data like {
                "EUR": 97.414,
                "USD": 108.31,
                "PLN": 416.44,
                "GBP": 81.36
            }
 */
export async function getAllCurrencyExchange(date, price, baseCurrency) {
  const targetCurrencies = BASE_CURRENCIES.filter(
    (val) => val !== baseCurrency
  ).join(",");

  const url = `https://api.frankfurter.app/${date}?from=${baseCurrency}&to=${targetCurrencies}&amount=${price}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const { amount, rates } = data;
    const result = { [baseCurrency]: amount };

    for (const [currency, rate] of Object.entries(rates)) {
      result[currency] = rate;
    }

    return result;
  } catch (error) {
    console.error("Error getAllCurrencyExchange data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
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
