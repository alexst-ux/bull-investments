const QUOTE_URL = "https://www.alphavantage.co/query?apikey=Y4USWACZ1ONRGNOU";
const GLOBAL_QUOTE_URL = QUOTE_URL + "&function=GLOBAL_QUOTE";
const GLOBAL_QUOTE_SYMBOL = GLOBAL_QUOTE_URL + "&symbol=";

export async function getLastQuotes({ signal, keys }) {
  const arrUlr = keys.map((el) => GLOBAL_QUOTE_SYMBOL + el);

  const quotesFetches = arrUlr.map(async (url) => {
    console.log(url);
    const response = await fetch(url, { signal });
    return response;
  });

  const result = await Promise.all(quotesFetches)
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => {
      console.log("data::", data);
      return data.reduce((acc, cur) => {
        let symbol = cur.at("Global Quote").at("01. symbol");
        console.log("symbol", symbol);
        acc[symbol] = 123;
      }, {});
    })
    .catch((error) => {
      console.error("Error getLastQuotes data:", error);
    });

  console.log("result::", result);
}

function start() {
  const controller = new AbortController();
  const signal = controller.signal;
  getLastQuotes({
    signal,
    keys: ["VUAA.LON", "SWRD.AMS"],
  });
}

start();
