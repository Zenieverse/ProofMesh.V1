import React from 'react';
import { ProofInput } from '../types';
import { GenerateIcon } from './icons';

interface InputFormProps {
  proofInput: ProofInput;
  setProofInput: (input: ProofInput) => void;
  onGenerate: () => void;
  onReset: () => void;
  onLoadExample: () => void;
  isLoading: boolean;
}

const InputFormComponent: React.FC<InputFormProps> = ({
  proofInput,
  setProofInput,
  onGenerate,
  onReset,
  onLoadExample,
  isLoading,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProofInput({
            ...proofInput,
            [name]: value,
        });
    };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-baseline">
        <h3 className="text-lg font-medium text-white">Enter Content Provenance</h3>
        <button
          type="button"
          onClick={onLoadExample}
          disabled={isLoading}
          className="text-sm font-medium text-hedera-blue hover:text-blue-400 focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Load Example Data
        </button>
      </div>

      <div>
        <label htmlFor="contentHash" className="block text-sm font-medium text-gray-300 mb-2">
          Content Hash (SHA-256) <span className="text-red-500">*</span>
        </label>
        <input
          id="contentHash"
          name="contentHash"
          type="text"
          value={proofInput.contentHash}
          onChange={handleInputChange}
          disabled={isLoading}
          className="font-mono w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-hedera-blue focus:border-hedera-blue sm:text-sm text-gray-200 transition-colors duration-200"
          placeholder="e.g., a1b2c3d4..."
          required
          aria-describedby="contentHash-help"
        />
        <p id="contentHash-help" className="mt-2 text-xs text-gray-500">The SHA-256 hash of the content file (image, video, document, etc.).</p>
      </div>

      <div>
        <label htmlFor="generator" className="block text-sm font-medium text-gray-300 mb-2">
          Generator <span className="text-red-500">*</span>
        </label>
        <input
          id="generator"
          name="generator"
          type="text"
          value={proofInput.generator}
          onChange={handleInputChange}
          disabled={isLoading}
          className="w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-hedera-blue focus:border-hedera-blue sm:text-sm transition-colors duration-200"
          placeholder="e.g., DALL-E 3, Sora, Human"
          required
          aria-describedby="generator-help"
        />
        <p id="generator-help" className="mt-2 text-xs text-gray-500">The AI model, software, or person that created the content.</p>
      </div>

      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Prompt (Optional)
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={3}
          value={proofInput.prompt}
          onChange={handleInputChange}
          disabled={isLoading}
          className="font-mono w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-hedera-blue focus:border-hedera-blue sm:text-sm text-gray-200 resize-y transition-colors duration-200"
          placeholder="The prompt used to generate the content, if applicable."
          aria-describedby="prompt-help"
        />
         <p id="prompt-help" className="mt-2 text-xs text-gray-500">The prompt used to generate the content, if applicable.</p>
      </div>

      <div>
        <label htmlFor="parentProofId" className="block text-sm font-medium text-gray-300 mb-2">
          Parent Proof ID (Optional)
        </label>
        <input
          id="parentProofId"
          name="parentProofId"
          type="text"
          value={proofInput.parentProofId}
          onChange={handleInputChange}
          disabled={isLoading}
          className="font-mono w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-hedera-blue focus:border-hedera-blue sm:text-sm transition-colors duration-200"
          placeholder="Link to a previous proof to create a provenance chain."
          aria-describedby="parentProofId-help"
        />
         <p id="parentProofId-help" className="mt-2 text-xs text-gray-500">Link to a previous proof to create a verifiable chain of edits or versions.</p>
      </div>

      <div className="flex justify-end items-center gap-4 pt-2">
        <button
          type="button"
          onClick={onReset}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-hedera-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Reset Form
        </button>
        <button
          onClick={onGenerate}
          disabled={isLoading || !proofInput.contentHash.trim() || !proofInput.generator.trim()}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-hedera-green hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-hedera-green disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            'Processing...'
          ) : (
            <>
              <GenerateIcon className="w-5 h-5 mr-2 -ml-1" />
              Create & Anchor Proof Stamp
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export const InputForm = React.memo(InputFormComponent);
