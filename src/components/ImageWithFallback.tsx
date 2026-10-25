import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  badgeText?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-[4/3]',
  badgeText,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#EFE8DC] ${aspectRatioClass} ${className}`}>
      {/* Visual background pattern placeholder while loading or if error */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#EFE8DC] via-[#E4D9C8] to-[#D7CCC8]">
          <div className="w-10 h-10 mb-2 rounded-full bg-[#C89D47]/15 flex items-center justify-center text-[#3E2723]">
            <svg
              className="w-5 h-5 text-[#C89D47]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="m14 10-4 4m0-4 4 4" />
            </svg>
          </div>
          <span className="text-xs font-medium text-[#3E2723]/70">{alt}</span>
        </div>
      )}

      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {badgeText && (
        <div className="absolute top-3 left-3 bg-[#3E2723]/85 backdrop-blur-xs text-[#F5F0E6] text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-sm">
          {badgeText}
        </div>
      )}
    </div>
  );
};
