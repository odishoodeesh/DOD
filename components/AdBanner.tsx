import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: 'true' | 'false';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  slot, 
  format = 'auto', 
  responsive = 'true', 
  className = '' 
}) => {
  useEffect(() => {
    try {
      // Small timeout to ensure the DOM is ready and adsbygoogle script is loaded
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }, 100);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('AdSense push error:', err);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden flex flex-col items-center py-6 ${className}`}>
      <span className="text-[9px] uppercase tracking-widest text-neutral-700 mb-2 font-medium">Advertisement</span>
      <div className="w-full bg-neutral-900/20 rounded-lg min-h-[100px] flex items-center justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-9619447476010525"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </div>
    </div>
  );
};

export default AdBanner;