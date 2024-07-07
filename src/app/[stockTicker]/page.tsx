// top-level page for app, wrapped with suspense paradigm for pageload

import { Suspense } from "react";
import { StockDropdown } from "@/components/stockDropdown";
import StockGraph from "@/components/StockGraph";
import { TimespanDropdown } from "@/components/timespanDropdown";
import { ToggleButtonGroup } from "@/components/toggleButtonGroup";
import LoadingSkeleton from "./loading";

interface StockPageProps {
  params: {
    stockTicker: string;
  };
  searchParams: {
    timeLength: string;
    timespan: string;
  };
}

export async function generateMetadata({ params }: StockPageProps) {
  return {
    title: `${params.stockTicker} Stock Data`,
  };
}

const StockPage = ({ params, searchParams }: StockPageProps) => {
  const { stockTicker } = params;
  const { timeLength, timespan } = searchParams;

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-900 px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col sm:flex-row items-center pb-10 space-y-4 sm:space-y-0 sm:space-x-4">
        <StockDropdown selected={stockTicker} />
        <ToggleButtonGroup selected={timeLength} />
        <TimespanDropdown selected={timespan} />
      </div>
      <div className="flex flex-col w-full bg-gray-800 rounded-lg shadow-xl p-8">
        <Suspense
          fallback={<LoadingSkeleton />}
          key={`${stockTicker}-${timeLength}-${timespan}`}
        >
          <StockGraph
            stockTicker={stockTicker}
            timeLength={timeLength}
            timespan={timespan}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default StockPage;
