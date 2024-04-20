// export const dynamic = 'force-dynamic' // defaults to auto
// /api/stock?{ticker}
export async function GET(request) {
  const searchParams = new URLSearchParams(request.url);
  const ticker = searchParams.get("ticker");
  const range = searchParams.get("range");
  const interval = searchParams.get("interval");
  console.log(searchParams);

  if (!ticker || !range || !interval)
    return Response.json({ message: "missing parameters" }, { status: 400 });

  const baseUrl = "https://query2.finance.yahoo.com/v8/finance"
  const url = `${baseUrl}/chart/${ticker}?range=${range}&interval=${interval}`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error("Failed to fetch data");
  const data = await response.json();
  // console.log(response.json().chart.result[0].indicators);
  console.log("Stock api called");
  return Response.json(data);
  // const getStock = (json) => {
  //   let prices = [];
  //   const data = json.chart.result[0];
  //   for (let i = 0; i < data.timestamp.length; i++) {
  //     let utc = new Date(0);
  //     utc.setUTCSeconds(data.timestamp[i]);
  //     const time = utc.toLocaleDateString();
  //     const price = data.indicators.quote[0].close[i].toFixed(1);
  //     prices.push(Quote("AAPL", price, time));
  //     // prices.push(price);
  //     // console.log(`${time}: ${price}\n`);
  //   }
  //   return prices;
  // }
}
