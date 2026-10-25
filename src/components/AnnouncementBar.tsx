import React, { useState } from 'react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="bg-[#3E2723] text-[#F5F0E6] text-xs py-2 px-4 text-center font-medium relative z-40 border-b border-[#C89D47]/30 flex items-center justify-center min-h-[36px]"
    >
      <div className="flex items-center gap-2 max-w-7xl mx-auto truncate">
        <span>Sweet Moments Start Here 🍫</span>
        <span aria-hidden="true" className="text-[#C89D47]">|</span>
        <span>Fresh Local Delivery in Aligarh</span>
        <span aria-hidden="true" className="text-[#C89D47]">|</span>
        <span className="text-[#D7CCC8]">Daily 10:00 AM – 6:00 PM</span>
      </div>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#D7CCC8] hover:text-[#F5F0E6] transition-colors"
        aria-label="Dismiss banner"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </aside>
  );
};
