"use client";

// dropdown to select stock

import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const relevantStockTickers: string[] = [
  "AAPL",
  "MSFT",
  "AMZN",
  "GOOGL",
  "GOOG",
  "TSLA",
  "NVDA",
  "JPM",
  "CAT",
  "BLK",
  "AMT",
  "ANTM",
  "SPGI",
  "SYK",
  "TJX",
  "BDX",
  "DUK",
  "ICE",
  "MMM",
  "USB",
  "NSC",
  "ADI",
  "MMC",
];

export const StockDropdown = ({ selected }: { selected: string }) => {
  const router = useRouter();

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const stockTicker = event.target.value.trim();

    if (!stockTicker) return;

    router.push(`/${stockTicker}?timeLength=1Y&timespan=day`);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <select
          value={selected}
          onChange={onSelect}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-600"
        >
          <option value="">Select Stock</option>
          {relevantStockTickers.map((ticker) => (
            <option key={ticker} value={ticker}>
              {ticker}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
