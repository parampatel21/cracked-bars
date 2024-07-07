"use client";

// dropdown to select timespan

import type { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const timespanOptions: string[] = ["minute", "day", "week", "month", "quarter"];

export const TimespanDropdown = ({ selected }: { selected: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timeLength = searchParams.get("timeLength") || "1D";

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const timespan = event.target.value.trim();

    if (!timespan) return;

    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const stockTicker = pathname.split("/")[1] || "NVDA";

    current.set("timespan", timespan);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`/${stockTicker}${query}`);
  };

  const isOptionDisabled = (option: string): boolean => {
    if (option === "quarter" && ["1D", "1W", "1M", "3M"].includes(timeLength)) {
      return true;
    }
    if (option === "minute" && !["1D", "1W", "1M"].includes(timeLength)) {
      return true;
    }
    if (option === "month" && ["1D", "1W"].includes(timeLength)) {
      return true;
    }
    if (option === "week" && ["1D"].includes(timeLength)) {
      return true;
    }
    return false;
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <select
          value={selected}
          onChange={onSelect}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-600"
        >
          <option value="">Select Timespan</option>
          {timespanOptions.map((option) => (
            <option
              key={option}
              value={option}
              disabled={isOptionDisabled(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
