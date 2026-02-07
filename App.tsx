
import React, { useState, useCallback } from 'react';
import { SCENARIOS } from './constants';
import { Scenario, ScenarioType } from './types';
import ScenarioCard from './components/ScenarioCard';
import ImageResult from './components/ImageResult';
import ImageUploader from './components/ImageUploader';
import { generateImages } from './services/geminiService';

const App: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScenarioSelect = async (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setError(null);
    setIsLoading(true);
    setImages([]); // Clear previous images on first select

    try {
      const result = await generateImages(scenario.basePrompt, uploadedImage);
      setImages(result);
    } catch (err) {
      setError("Something went wrong while generating. Please try again.");
      setSelectedScenario(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMore = async () => {
    if (!selectedScenario) return;
    setError(null);
    setIsLoading(true);

    try {
      const result = await generateImages(selectedScenario.basePrompt, uploadedImage);
      setImages(result);
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError("Generation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSelectedScenario(null);
    setImages([]);
    setError(null);
    // Note: We don't automatically clear the uploaded image so user can try multiple styles
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 md:px-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Zero Prompt Experience
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
          DOD
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-medium">
          The ultimate AI image generator. Select a style, get 2 hyper-realistic masterpieces instantly.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center font-medium max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {!selectedScenario ? (
          <>
            <ImageUploader onImageUpload={setUploadedImage} disabled={isLoading} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {SCENARIOS.map((scenario) => (
                <ScenarioCard 
                  key={scenario.id} 
                  scenario={scenario} 
                  onClick={handleScenarioSelect} 
                  disabled={isLoading}
                />
              ))}
            </div>
          </>
        ) : (
          <ImageResult 
            images={images} 
            onGenerateMore={handleGenerateMore} 
            onReset={reset}
            isLoading={isLoading}
          />
        )}

        {/* Global Loading Overlay (When selecting first time) */}
        {isLoading && !images.length && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-8" />
            <h2 className="text-2xl font-bold mb-2">Generating Masterpiece...</h2>
            <p className="text-neutral-400 max-w-xs">
              Our AI is crafting {selectedScenario?.name} variations {uploadedImage ? "based on your photo" : ""} with pixel-perfect detail.
            </p>
            
            <div className="mt-12 w-full max-w-md bg-neutral-900 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-blue-500 animate-[loading_3s_ease-in-out_infinite]" />
            </div>
            <style>{`
              @keyframes loading {
                0% { width: 0%; transform: translateX(-100%); }
                50% { width: 70%; transform: translateX(0%); }
                100% { width: 100%; transform: translateX(100%); }
              }
            `}</style>
          </div>
        )}
      </main>

      {/* Footer */}
      {!isLoading && !selectedScenario && (
        <footer className="mt-24 text-center text-neutral-600">
          <p className="text-sm">Powered by Gemini &mdash; High-Realism Generation Engine</p>
        </footer>
      )}
    </div>
  );
};

export default App;
