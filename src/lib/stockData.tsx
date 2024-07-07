// fetches stock data

export async function getStockData(
  stockTicker: string,
  timeLength: string,
  timespan: string
) {
  const validTimespans = ["minute", "day", "week", "month", "quarter"];
  const validTimeLengths = ["1D", "1W", "2W", "1M", "3M", "1Y", "2Y"];
  if (!validTimespans.includes(timespan)) {
    throw new Error("Invalid timespan");
  }

  const stockTickerRegex = /\b[A-Z]{1,5}\b/;
  if (!stockTickerRegex.test(stockTicker)) {
    throw new Error("Invalid stock ticker");
  }

  if (!validTimeLengths.includes(timeLength)) {
    throw new Error("Invalid time length");
  }

  if (
    timespan === "quarter" &&
    ["1D", "1W", "2W", "1M", "3M"].includes(timeLength)
  ) {
    throw new Error("Quarter timespan requires a minimum time length of 1Y.");
  }

  if (timespan === "minute" && !["1D", "1W", "2W", "1M"].includes(timeLength)) {
    throw new Error("Minute timespan requires a maximum time length of 2W.");
  }

  if (timespan === "month" && ["1D", "1W", "2W"].includes(timeLength)) {
    throw new Error("Month timespan requires a minimum time length of 1M.");
  }

  if (timespan === "week" && ["1D"].includes(timeLength)) {
    throw new Error("Week timespan requires a minimum time length of 1W.");
  }

  const today = new Date();
  const to = new Date(today);
  to.setDate(today.getDate() - 1);

  let from = new Date(to);

  switch (timeLength) {
    case "1D":
      from.setDate(to.getDate() - 1);
      break;
    case "1W":
      from.setDate(to.getDate() - 7);
      break;
    case "2W":
      from.setDate(to.getDate() - 14);
      break;
    case "1M":
      from.setMonth(to.getMonth() - 1);
      break;
    case "3M":
      from.setMonth(to.getMonth() - 3);
      break;
    case "1Y":
      from.setFullYear(to.getFullYear() - 1);
      break;
    case "2Y":
      from.setFullYear(to.getFullYear() - 2);
      break;
    default:
      throw new Error("Invalid time length");
  }

  const fromDateString = from.toISOString().split("T")[0];
  const toDateString = to.toISOString().split("T")[0];

  const baseURL = "https://api.polygon.io/v2/aggs/ticker";
  const apiKey = process.env.POLYGON_API_KEY;
  const url = `${baseURL}/${stockTicker}/range/1/${timespan}/${fromDateString}/${toDateString}?adjusted=true&sort=asc&limit=18000&apiKey=${apiKey}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
