import React, { useState, useEffect } from 'react';
import { ProofReceipt } from '../types';
import { CopyIcon, CheckIcon } from './icons';

interface OutputDisplayProps {
  output: ProofReceipt;
}

const OutputDisplayComponent: React.FC<OutputDisplayProps> = ({ output }) => {
  const [copied, setCopied] = useState(false);
  const outputString = JSON.stringify(output, null, 2);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputString);
    setCopied(true);
  };

  return (
    <div className="fade-in bg-gray-900/80 border border-gray-700 rounded-lg shadow-lg relative">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Proof Receipt</h3>
            <button
                onClick={handleCopy}
                className="inline-flex items-center px-3 py-1.5 border border-gray-600 text-xs font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-hedera-blue transition-all"
                >
                {copied ? (
                    <>
                    <CheckIcon className="w-4 h-4 mr-2 text-hedera-green" />
                    Copied
                    </>
                ) : (
                    <>
                    <CopyIcon className="w-4 h-4 mr-2" />
                    Copy
                    </>
                )}
            </button>
      </div>
      <div className="p-6">
        <pre className="text-sm text-gray-200 overflow-x-auto font-mono">
          <code>{outputString}</code>
        </pre>
      </div>
    </div>
  );
};

export const OutputDisplay = React.memo(OutputDisplayComponent);
