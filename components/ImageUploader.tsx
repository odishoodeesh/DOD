
import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (base64: string | null) => void;
  disabled?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, disabled }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        // Strip the data:image/png;base64, prefix for the service, but keep it for preview
        const pureBase64 = base64.split(',')[1];
        onImageUpload(pureBase64);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onImageUpload(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div 
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center min-h-[200px] 
          ${preview ? 'border-blue-500 bg-blue-500/5' : 'border-neutral-800 hover:border-neutral-600 bg-neutral-900/50'} 
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef} 
          accept="image/*" 
          onChange={handleFileChange}
          disabled={disabled}
        />

        {preview ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img src={preview} alt="Upload preview" className="w-32 h-32 object-cover rounded-2xl shadow-xl border-2 border-blue-500/50" />
              <button 
                onClick={clearImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-blue-400 font-medium text-sm">Image uploaded. Select a style below to reimagined yourself.</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Upload Your Photo (Optional)</h3>
            <p className="text-neutral-500 text-sm mt-1">Upload a face or portrait to get personalized results</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
