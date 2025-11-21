import React, { useState, useCallback, useRef, useEffect } from 'react';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { Loader } from './components/Loader';
import { generateProof } from './services/proofmeshService';
import { ProofReceipt, ProofInput } from './types';
import { HederaLogo } from './components/icons';
import ErrorBoundary from './components/ErrorBoundary';

const initialProofInput: ProofInput = {
    contentHash: '',
    generator: '',
    prompt: '',
    parentProofId: ''
};

const exampleProofInput: ProofInput = {
    contentHash: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
    generator: 'DALL-E 3',
    prompt: 'A vibrant oil painting of a futuristic city skyline at dusk',
    parentProofId: ''
};

const App: React.FC = () => {
  const [proofInput, setProofInput] = useState<ProofInput>(initialProofInput);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [output, setOutput] = useState<ProofReceipt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerateProof = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setOutput(null);

    const steps = [
      'Canonicalizing provenance data...',
      'Computing metadata hash (SHA-256)...',
      'Generating Proof Stamp...',
      'Anchoring proof on Hedera Consensus Service...',
      'Producing verification report...',
      'Finalizing receipt...'
    ];

    try {
      for (const step of steps) {
        setLoadingStep(step);
        await new Promise(resolve => setTimeout(resolve, 350));
      }

      const result = await generateProof(proofInput);
      setOutput(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  }, [proofInput]);

  const handleResetForm = useCallback(() => {
    setProofInput(initialProofInput);
    setError(null);
    setOutput(null);
  }, []);

  const handleLoadExample = useCallback(() => {
    setProofInput(exampleProofInput);
    setError(null);
    setOutput(null);
  }, []);

  useEffect(() => {
    if (isLoading && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-900 font-sans text-gray-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <HederaLogo className="h-12 w-12 text-hedera-green" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Universal Proof Layer
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A trust layer for AI & Media. Create verifiable provenance for any content by anchoring its metadata hash on the Hedera network.
          </p>
        </header>

        <main className="space-y-8">
          <ErrorBoundary>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-lg">
              <InputForm
                proofInput={proofInput}
                setProofInput={setProofInput}
                onGenerate={handleGenerateProof}
                onReset={handleResetForm}
                onLoadExample={handleLoadExample}
                isLoading={isLoading}
              />
            </div>
            
            <div ref={resultsRef}>
              {isLoading && <Loader step={loadingStep} />}
              {error && (
                <div className="fade-in bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              {output && <OutputDisplay output={output} />}
            </div>
          </ErrorBoundary>
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>A deterministic agent in the Hedera Nexus Agents ecosystem.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
