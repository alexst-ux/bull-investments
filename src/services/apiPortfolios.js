import supabase from "./supabase";

export async function getPortfolio(id) {
  const { data, error } = await supabase
    .from("portfolio")
    .select(
      "id, name, description, holdings(stock_id, quantity, start_price_currencies, stock(symbol))"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Portfolio not found");
  }

  return data;
}

export async function getPortfolios() {
  //const { data, error } = await supabase.from("portfolio").select("id, name");

  const { data, error } = await supabase
    .from("portfolio")
    .select("id, name, stocks_cnt:holdings(quantity.sum())");
  /* .select(
      "id, name, holdings(stocks_cnt:quantity.sum(), types_cnt:stock_id.count()))"
    ); */

  if (error) {
    console.error("error function getPortfolios()", error);
    throw new Error("Portfolios could not be loaded");
  }

  return data;
}

export async function getPortfoliosExt() {
  const { data, error } = await supabase
    .from("portfolio")
    .select(
      "id, name, description, holdings(stock_id, quantity, start_price_currencies, stock(symbol))"
    );
  /* .select(
      "id, name, holdings(stocks_cnt:quantity.sum(), types_cnt:stock_id.count()))"
    ); */

  if (error) {
    console.error("error function getPortfolios()", error);
    throw new Error("Portfolios could not be loaded");
  }

  return data;
}

export async function createEditPortfolio(newPortfolio, userId, id) {
  let query = supabase.from("portfolio");
  if (!id) {
    query = query.insert([{ ...newPortfolio, user_id: userId }]);
  } else {
    query = query.update({ ...newPortfolio }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error("error function createEditPortfolio ", error);
    throw new Error("Portfolio could not be created/updated");
  }

  return data;
}

export async function deletePortfolio(id) {
  const { data, error } = await supabase
    .from("portfolio")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("error function deletePortfolio()", error);
    throw new Error("Portfolio could not be deleted");
  }
  return data;
}
