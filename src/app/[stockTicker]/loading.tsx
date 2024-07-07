// Skeleton is ripped and GPT-modified from: https://flowbite.com/docs/components/skeleton/

export default function LoadingSkeleton() {
  const yAxisLabels = Array.from({ length: 5 }, (_, i) => (4 - i) * 25);

  return (
    <div className="relative w-full h-full flex p-8 animate-pulse min-h-[250px]">
      <div className="absolute top-0 left-0 flex flex-col">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
      </div>

      <div className="flex flex-col justify-between">
        {yAxisLabels.map((label, idx) => (
          <div
            key={idx}
            className="relative flex items-center justify-end h-1/5"
          >
            <div className="text-gray-400 text-xs w-12">${label}</div>
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
              {[...Array(7)].map((_, idx) => (
                <div key={idx} className="relative flex items-center">
                  <div className="h-2 w-px bg-gray-600"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end h-full w-full pt-4">
            {[...Array(7)].map((_, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center"
                style={{ flex: "1 1 14%" }}
              >
                <div
                  className="relative flex justify-center w-full bg-gray-400"
                  style={{ height: "50px", bottom: 0 }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
