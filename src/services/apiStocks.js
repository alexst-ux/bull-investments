import supabasePromise from "./supabase";

export async function getStocksShort() {
  const supabase = await supabasePromise;
  let query = supabase.from("stock").select("id, symbol, currency");

  const { data, error } = await query;
  if (error) {
    console.error("ERROR getStocksShort ", error);
    throw new Error("Stocks not found");
  }

  return data;
}

export async function getStocksData(arrSymbols) {
  const monthly_data = "Monthly Time Series";
  const supabase = await supabasePromise;
  let query = supabase
    .from("stock")
    //.select("id, symbol, currency, data");
    .select(`id, symbol, currency, monthly_data: data->"${monthly_data}"`);

  if (arrSymbols && arrSymbols.length > 0) {
    query.in("symbol", arrSymbols);
  }

  const { data, error } = await query;
  if (error) {
    console.error("ERROR getStocksData ", error);
    throw new Error("Stock(s) data not found", { cause: error.message });
  }

  return data;
}
