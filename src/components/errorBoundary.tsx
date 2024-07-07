"use client";

// error handler using react paradigm, preventing end-user from seeing error but am console logging

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const errorMessage =
        "Too many requests have been made to the API or your request was malformed. Please try again with the button below.";

      return <ErrorFallback errorMessage={errorMessage} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ errorMessage: string }> = ({
  errorMessage,
}) => {
  const handleReload = () => {
    window.location.href = "/NVDA?timeLength=1Y&timespan=day";
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-900 px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col w-1/3 bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="text-xl font-bold text-white mb-4">Error</div>
        <div className="text-sm text-gray-400 mb-8">{errorMessage}</div>
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
export default ErrorBoundary;
