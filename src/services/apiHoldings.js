import supabasePromise from "./supabase";
import { getAllCurrencyExchange } from "./apiCurrencyExchange";

export async function getActiveHoldings() {
  const supabase = await supabasePromise;
  let query = supabase
    .from("holdings")
    .select("id, quantity, start_date, start_price_currencies, stock(symbol)")
    .is("end_date", null)
    .order("start_date");

  const { data, error } = await query;
  if (error) {
    console.error("ERROR getActiveHoldings ", error);
    throw new Error("Active Holdings not found");
  }

  return data;
}

/**
 *
 * @param {Object} avrgHoldings - Object structure is list of stock data like
 *  {
      "VUAA.LON": {
          "avrg": 72.4863,
          "count": 54
      },
      "SWRD.AMS": {
          "avrg": 30.1043,
          "count": 167
      }
  }
 * @returns {Promise} Promise of Stock Object with current prices
 */
export async function getCurrentPrices(avrgHoldings) {
  if (!avrgHoldings) return;

  const avrgDataKeys = Object.keys(avrgHoldings);

  const supabase = await supabasePromise;
  let query = supabase
    .from("stock")
    .select("symbol, currency, last_data")
    .in("symbol", avrgDataKeys);

  const { data, error } = await query;
  if (error) {
    console.error("ERROR getUnrealizedGain ", error);
    throw new Error("Stock(s) not found");
  }

  const newData = await Promise.all(
    data.map(async (el) => {
      const currencyData = await getAllCurrencyExchange(
        el.last_data["Global Quote"]["07. latest trading day"],
        el.last_data["Global Quote"]["05. price"],
        el.currency
      );
      el.currency = currencyData;
      return el;
    })
  );
  return newData;
}

export async function createEditHolding(holding, id) {
  let newHolding;

  if (!id) {
    const jStockId = JSON.parse(holding.stock_id);
    const { id: stock_id, currency } = jStockId;

    const start_price_currencies = await getAllCurrencyExchange(
      holding.start_date,
      holding.start_price_currencies,
      currency
    );

    if (!start_price_currencies)
      throw new Error("CurrencyExchange does not work!");

    newHolding = {
      ...holding,
      stock_id,
      start_price_currencies,
      commission: holding.commission ? holding.commission : 0,
    };
  } else {
    newHolding = {
      ...holding,
    };
  }

  const supabase = await supabasePromise;
  let query = supabase.from("holdings");

  // 1) Create a Holding
  if (!id) {
    query = query.insert([{ ...newHolding }]);
  } else {
    query = query.update({ ...newHolding }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error("error function createEditHolding ", error);
    throw new Error("Holding could not be created");
  }

  return data;
}
