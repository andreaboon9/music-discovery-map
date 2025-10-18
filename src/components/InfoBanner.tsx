import { useState, useEffect } from 'react';

const INFO_BANNER_DISMISSED_KEY = 'musicMapInfoBannerDismissed';

export const InfoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem(INFO_BANNER_DISMISSED_KEY);
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(INFO_BANNER_DISMISSED_KEY, 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="absolute top-8 right-4 md:right-8 z-10 w-auto max-w-xs animate-fade-in">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 md:p-4 flex items-start gap-3">
        <div className="flex-1">
          <p className="text-white/80 text-xs md:text-sm leading-relaxed">
            <span className="font-medium text-white">How it works:</span> The closer an artist is to the center, 
            the more similar they are. Click any artist to view their top songs.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-white/60 hover:text-white transition-colors p-1"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
