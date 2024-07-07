import { getStockData } from "@/lib/stockData";

// bar graph component implemented using solely Tailwind CSS

interface StockGraphProps {
  stockTicker: string;
  timeLength: string;
  timespan: string;
}

interface Result {
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
}

interface StockDataResponse {
  results: Result[];
}

const StockGraph = async ({
  stockTicker,
  timeLength,
  timespan,
}: StockGraphProps) => {
  let data: StockDataResponse | undefined;
  let error: string | null = null;

  try {
    data = await getStockData(stockTicker, timeLength, timespan);
  } catch (err) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = String(err);
    }
  }

  if (error) {
    throw new Error(error);
  }

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    switch (timespan) {
      case "minute":
        return `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;
      case "hour":
        return `${date.toLocaleDateString()} ${date.getHours()}:00`;
      case "day":
        return date.toLocaleDateString();
      case "week":
        const weekStart = new Date(
          date.setDate(date.getDate() - date.getDay())
        );
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
      case "month":
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
      case "quarter":
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        return `Q${quarter} ${date.getFullYear()}`;
      case "year":
        return `${date.getFullYear()}`;
      default:
        return date.toLocaleDateString();
    }
  };

  const maxPrice = Math.max(
    ...data!.results.map((result: Result) => result.vw)
  );
  const chartHeight = 200;

  const yAxisLabels = Array.from(
    { length: 5 },
    (_, i) => (maxPrice / 4) * i
  ).reverse();

  const numLabels = Math.min(data!.results.length, 5);
  const xAxisLabels = data!.results
    .filter(
      (_, index) => index % Math.floor(data!.results.length / numLabels) === 0
    )
    .map((result) => formatDate(result.t));

  return (
    <>
      <div className="text-xl font-bold text-white">
        {stockTicker} Stock Price
      </div>
      <div className="text-sm text-gray-400 mb-4">
        Total number of data points: {data?.results.length}
      </div>
      <div className="relative w-full h-full flex p-8">
        <div className="flex flex-col justify-between">
          {yAxisLabels.map((label, idx) => (
            <div
              key={idx}
              className="relative flex items-center justify-end h-1/5"
            >
              <div className="text-white text-xs w-12">
                ${Math.floor(label).toFixed(0)}
              </div>
              <div className="absolute left-full h-px w-2 bg-gray-600"></div>
            </div>
          ))}
        </div>
        <div className="relative flex-1 flex flex-col">
          <div className="absolute inset-0 flex flex-col">
            {yAxisLabels.map((label, idx) => (
              <div key={idx} className="flex-grow relative flex items-center">
                <div className="flex-1 border-t border-dashed border-gray-600 ml-1"></div>
              </div>
            ))}
          </div>
          <div className="relative flex-1 flex items-end ml-2">
            <div className="absolute left-0 bottom-0 h-full w-full">
              <div className="absolute left-0 bottom-0 h-full border-l z-10 border-gray-600"></div>
              <div className="absolute left-0 bottom-0 w-full border-b z-10 border-gray-600"></div>
              {yAxisLabels.map((label, idx) => (
                <div
                  key={idx}
                  className="absolute left-0 h-2 border-r border-gray-600"
                  style={{ bottom: `${idx * 25}%` }}
                ></div>
              ))}
              <div className="absolute bottom-0 flex w-full -my-2 justify-between pr-1">
                {xAxisLabels.map((label, idx) => (
                  <div key={idx} className="relative flex items-center">
                    <div className="h-2 w-px bg-gray-600"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-end h-full w-full pt-4">
              {data!.results.map((result: Result, idx) => (
                <div
                  key={result.t}
                  className="relative flex flex-col items-center group transform transition-transform duration-300 hover:scale-125 hover:z-10 origin-bottom"
                  style={{
                    flex: `1 1 ${100 / data!.results.length}%`,
                  }}
                >
                  <span className="absolute top-0 hidden -mt-24 z-10 bg-gray-700 text-white text-xs p-2 rounded font-bold group-hover:block min-w-max">
                    <p>{formatDate(result.t)}</p>
                    <p>Agg. Price: ${result.vw.toLocaleString()}</p>
                    <p>
                      H/L: ${result.h.toLocaleString()}, $
                      {result.l.toLocaleString()}
                    </p>
                    <p>Volume: {result.v.toLocaleString()}</p>
                  </span>
                  <div
                    className="relative flex justify-center w-full bg-indigo-600 group-hover:bg-indigo-400"
                    style={{
                      height: `${(result.vw / maxPrice) * chartHeight}px`,
                      bottom: 0,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-400 pl-8 pr-2">
        <div>
          Hint: For 5000+ data points, select a stock and use: 1M, by minute.
        </div>
        <div className="text-right text-white font-bold">Current</div>
      </div>
    </>
  );
};

export default StockGraph;
