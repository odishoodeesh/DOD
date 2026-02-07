
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageResultProps {
  images: string[];
  onGenerateMore: () => void;
  onReset: () => void;
  isLoading: boolean;
}

const ImageResult: React.FC<ImageResultProps> = ({ images, onGenerateMore, onReset, isLoading }) => {
  const downloadImage = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `dod-gen-${index + 1}.png`;
    link.click();
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((img, idx) => (
          <div key={idx} className="relative group rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-square">
            <img 
              src={img} 
              alt={`Generated result ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => downloadImage(img, idx)}
                className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-neutral-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Save Image
              </button>
            </div>
          </div>
        ))}
        {images.length === 0 && isLoading && (
           <>
            <div className="aspect-square rounded-3xl border border-neutral-800 shimmer" />
            <div className="aspect-square rounded-3xl border border-neutral-800 shimmer" />
           </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pb-12">
        <button
          onClick={onGenerateMore}
          disabled={isLoading}
          className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-800 text-white rounded-full font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20"
        >
          {isLoading ? (
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          Generate More
        </button>
        <button
          onClick={onReset}
          disabled={isLoading}
          className="w-full sm:w-auto px-10 py-4 bg-transparent border border-neutral-700 hover:bg-neutral-800 text-white rounded-full font-bold text-lg transition-all"
        >
          Change Style
        </button>
      </div>
    </div>
  );
};

export default ImageResult;
