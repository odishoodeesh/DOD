
'use client';

import React, { useState } from 'react';
import { SCENARIOS } from '@/constants';
import { Scenario } from '@/types';
import ScenarioCard from '@/components/ScenarioCard';
import ImageResult from '@/components/ImageResult';
import ImageUploader from '@/components/ImageUploader';
import AdBanner from '@/components/AdBanner';
import CommunityFeed from '@/components/CommunityFeed';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveToShowcase = async (imageUrl: string, scenario: Scenario) => {
    try {
      await addDoc(collection(db, "showcase"), {
        imageUrl,
        scenarioName: scenario.name,
        scenarioIcon: scenario.icon,
        timestamp: serverTimestamp(),
      });
    } catch (e: any) {
      if (e.code === 'permission-denied') {
        console.warn("Could not save to community showcase: Permission Denied.");
      } else {
        console.error("Error saving to showcase: ", e);
      }
    }
  };

  const callGenerateApi = async (prompt: string, refImage: string | null) => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, referenceImageBase64: refImage }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Generation failed");
    return data.images;
  };

  const handleScenarioSelect = async (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setError(null);
    setIsLoading(true);
    setImages([]); 

    try {
      const result = await callGenerateApi(scenario.basePrompt, uploadedImage);
      setImages(result);
      if (result.length > 0) {
        saveToShowcase(result[0], scenario);
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Something went wrong while generating.");
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
      const result = await callGenerateApi(selectedScenario.basePrompt, uploadedImage);
      setImages(result);
      if (result.length > 0) {
        saveToShowcase(result[0], selectedScenario);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "Generation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSelectedScenario(null);
    setImages([]);
    setError(null);
  };

  return (
    <div className="min-h-screen px-4 py-12 md:px-8">
      <header className="max-w-7xl mx-auto text-center mb-8">
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

      <div className="max-w-4xl mx-auto mb-8">
        <AdBanner slot="8273645102" />
      </div>

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
            <div className="mt-20">
              <CommunityFeed />
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

        {isLoading && !images.length && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-8" />
            <h2 className="text-2xl font-bold mb-2 text-white">Generating Masterpiece...</h2>
            <p className="text-neutral-400 max-w-xs">
              Our AI is crafting {selectedScenario?.name} variations {uploadedImage ? "based on your photo" : ""} with pixel-perfect detail.
            </p>
            <div className="mt-12 w-full max-w-md bg-neutral-900 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-blue-500 animate-loading" />
            </div>
          </div>
        )}
      </main>

      <div className="max-w-4xl mx-auto mt-12">
        <AdBanner slot="9182736450" />
      </div>

      <footer className="mt-12 text-center text-neutral-600 space-y-4 pb-12">
        <div className="w-full border-t border-neutral-900 pt-8">
          <p className="text-sm">Powered by Gemini &mdash; High-Realism Generation Engine</p>
        </div>
      </footer>
    </div>
  );
}
