import { format, formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatCurrencyExt = (value, currencyIn) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: currencyIn,
  }).format(value);

export const getCurrSymb = (currency) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency })
    .formatToParts(1)
    .find((x) => x.type === "currency").value;

export const getFixedFloat = (num, fraction) =>
  parseFloat(num.toFixed(fraction));

export const getPercent = (value, diffValue) => {
  if (!value || !diffValue) {
    return 0;
  }
  return ((diffValue * 100) / value).toFixed(2);
};

export const getInvested = (holdings, currency) => {
  if (!holdings || holdings.length == 0) return 0;

  return holdings.reduce(
    (acc, cur) => acc + cur.quantity * cur.start_price_currencies[currency],
    0
  );
};

export const getUnrealizedGain = (avrgHoldings, currentPrices, currency) => {
  const unrealizedGain = currentPrices.reduce((acc, cur) => {
    const avrgCur = avrgHoldings[cur.symbol];
    acc += (cur.currency[currency] - avrgCur.avrg) * avrgCur.count;
    return acc;
  }, 0);

  return unrealizedGain;
};

/**
 *
 * @param {Object} holdings object structure must have {
 *   stock: {symbol: "SYMBOL_NAME like VUAA.LON"},
 *   quantity: number,
 *   start_price_currencies: {EUR: number, GBP:number, PLN:number, USD:number}
 * }
 * @param {String} currency value like "USD|EUR|PLN|GBP"
 * @returns {Object} structure like 
 * { "VUAA.LON": {  "avrg": 72.4863,  "count": 54, "stock_id": 1234}, "SWRD.AMS": { "avrg": 30.1043,  "count": 167 }
   }
 */
export const getAveragePrices = (holdings, currency) => {
  const result = holdings.reduce((acc, cur) => {
    let symb = cur.stock.symbol;
    if (!acc[symb]) {
      acc[symb] = {
        avrg: cur.start_price_currencies[currency],
        count: cur.quantity,
        stock_id: cur.stock_id,
      };
    } else {
      let cPrice = cur.start_price_currencies[currency];
      let accPrice = acc[symb].avrg;
      let accCnt = acc[symb].count;
      let newCnt = acc[symb].count + cur.quantity;
      let newAvrg = parseFloat(
        ((cPrice * cur.quantity + accPrice * accCnt) / newCnt).toFixed(4)
      );
      acc[symb] = {
        avrg: newAvrg,
        count: newCnt,
        stock_id: cur.stock_id,
      };
    }
    return acc;
  }, {});

  return result;
  /* result like
    {
      'VUAA.LON': { avrg: 73.625, count: 54 },
      'SWRD.AMS': { avrg: 30.825, count: 167 }
    }
   */
};

/*
console.log(
  hold.reduce((acc, el) => {
    acc[el.start_date]
      ? (acc[el.start_date] += el.quantity * el.start_price_currencies["USD"])
      : (acc[el.start_date] = el.quantity * el.start_price_currencies["USD"]);
    return acc;
  }, {})
);
*/

export const getInvestedMonths = (holdings, currency) => {
  return holdings.reduce((acc, el) => {
    const frmMonth = format(el.start_date, "MMM yyyy");
    const lObj = acc.find((ar) => ar.month === frmMonth);
    const lSum = getFixedFloat(
      el.quantity * el.start_price_currencies[currency],
      2
    );
    if (lObj) {
      lObj.sum += lSum;
    } else {
      acc.push({
        month: frmMonth,
        sum: lSum,
      });
    }

    return acc;
  }, []);
};

/**
 * @param {Object} holdings
 * @returns array of the holdings symbols
 */
export const getStockSymbols = (holdings) => {
  return holdings.reduce((acc, el) => {
    const symbol = el.stock.symbol;
    if (acc.indexOf(symbol) === -1) acc.push(symbol);

    return acc;
  }, []);
};
