// "use client";
// import { Play } from "next/font/google";
import Image from "next/image";
// import { useEffect, useState } from "react";

const Quote = (ticker, price, timestamp) => { return { ticker: ticker, price: price, timestamp: timestamp } }
const getStock = (json) => {
  let prices = [];
  const data = json.chart.result[0];
  for (let i = 0; i < data.timestamp.length; i++) {
    let utc = new Date(0);
    utc.setUTCSeconds(data.timestamp[i]);
    const time = utc.toLocaleDateString();
    const price = data.indicators.quote[0].close[i].toFixed(1);
    prices.push(Quote("AAPL", price, time));
    // prices.push(price);
    // console.log(`${time}: ${price}\n`);
  }
  return prices;
}

export default async function Home() {
  // const [data, setData] = useState(0);
  // useEffect(() => {
  //   setData(getData());
  // }, []);
  const ticker = "AAPL";
  const range = "5d";
  const interval = "1d";
  console.log(process.env.REACT_APP_URL);
  console.log(`${process.env.REACT_APP_URL}/api/search?&ticker=${ticker}&range=${range}&interval=${interval}`)
  const request = await fetch(`${process.env.REACT_APP_URL}/api/search?&ticker=${ticker}&range=${range}&interval=${interval}`);
  if (!request.ok)
    throw new Error("Fetch failed")
  const data = await request.json();

  const stock = getStock(data);
  // for (let i = 0; i < stock.length; i++) {
  //   console.log(stock[i]);
  // }
  // console.log(stock.chart.result[0].indicators);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div>
        {/* stock.map((item, index) =>
          (<div key={index}>{item.price}</div>)
        )*/}
      </div>
    </main>
  );
}
