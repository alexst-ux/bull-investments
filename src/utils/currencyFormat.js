/**
 * formatCurrency is a Map, key is a currency name, value is object of functions
 */

export const BASE_CURRENCIES = ["USD", "EUR", "PLN", "GBP"];

class CurrencyFormat {
  #formatCurrency = new Map();

  constructor({ currencies = ["USD", "EUR", "GBP", "PLN", "ILS"] }) {
    currencies.forEach(this.addCurrency);
  }

  addCurrency = (currency) => {
    const numFormat = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    });
    this.#formatCurrency.set(currency, {
      format: numFormat.format,
      symbol: numFormat.formatToParts(1).find((x) => x.type === "currency")
        .value,
    });
  };

  getSymbol = (currency) => {
    if (!this.#formatCurrency.has(currency)) {
      throw new Error(`Unsupported currency: ${currency}`);
    }
    return this.#formatCurrency.get(currency).symbol;
  };

  format = (value, currency) => {
    if (!this.#formatCurrency.has(currency)) {
      throw new Error(`Unsupported currency: ${currency}`);
    }
    return this.#formatCurrency.get(currency).format(value);
  };
}

const currencyFormat = new CurrencyFormat({
  currencies: BASE_CURRENCIES,
});

export default currencyFormat;

/* 
console.log(currencyFormat.getSymbol("USD"));
console.log(currencyFormat.getSymbol("EUR"));
console.log(currencyFormat.getSymbol("GBP"));
console.log(currencyFormat.getSymbol("PLN"));
console.log(currencyFormat.getSymbol("ILS"));

console.log(currencyFormat.format(100, "USD"));
console.log(currencyFormat.format(100, "EUR"));
console.log(currencyFormat.format(100, "GBP"));
console.log(currencyFormat.format(100, "PLN"));
console.log(currencyFormat.format(500, "ILS")); */
