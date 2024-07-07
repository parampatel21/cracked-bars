import React from "react";

// not-found.tsx, dupe of errorBoundary.tsx

const NotFound: React.FC = () => {
  const handleReload = () => {
    window.location.href = "/NVDA?timeLength=1Y&timespan=day";
  };
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-900 px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col w-1/3 bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="text-xl font-bold text-white mb-4">Error</div>
        <button
          onClick={handleReload}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500"
        >
          Go to NVDA Stock Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
