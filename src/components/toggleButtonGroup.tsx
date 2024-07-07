"use client";

// button group to select timeframe of graph from current day backwards

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const timeLengthOptions = ["1D", "1W", "1M", "3M", "1Y", "2Y"];

export const ToggleButtonGroup = ({ selected }: { selected: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timespan = searchParams.get("timespan") || "day";

  const onSelect = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const stockTicker = pathname.split("/")[1] || "NVDA";

    current.set("timeLength", value);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`/${stockTicker}${query}`);
  };

  const isOptionDisabled = (option: string): boolean => {
    if (timespan === "quarter" && ["1D", "1W", "1M", "3M"].includes(option)) {
      return true;
    }
    if (timespan === "minute" && !["1D", "1W", "1M"].includes(option)) {
      return true;
    }
    if (timespan === "month" && ["1D", "1W"].includes(option)) {
      return true;
    }
    if (timespan === "week" && ["1D"].includes(option)) {
      return true;
    }
    return false;
  };

  return (
    <div className="grid w-full place-items-center overflow-x-scroll rounded-lg lg:overflow-visible">
      <div className="flex divide-x divide-gray-800">
        {timeLengthOptions.map((option, idx) => (
          <button
            key={option}
            className={`align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-20 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-700 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.55] focus:shadow-none active:opacity-[0.45] active:shadow-none 
              ${
                idx === 0
                  ? "rounded-r-none border-r-0"
                  : idx === timeLengthOptions.length - 1
                  ? "rounded-l-none"
                  : "rounded-r-none border-r-0 rounded-l-none"
              }
              ${selected === option ? "bg-indigo-600" : ""}
            `}
            onClick={() => onSelect(option)}
            disabled={isOptionDisabled(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
