import React from 'react';

interface LoaderProps {
  step: string;
}

const LoaderComponent: React.FC<LoaderProps> = ({ step }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800/50 border border-gray-700 rounded-lg space-y-4" role="status" aria-live="polite">
      <svg className="animate-spin h-8 w-8 text-hedera-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-gray-300 font-medium text-center">{step}</p>
    </div>
  );
};

export const Loader = React.memo(LoaderComponent);
