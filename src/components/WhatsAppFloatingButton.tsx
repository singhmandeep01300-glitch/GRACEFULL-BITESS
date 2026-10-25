import React, { useState } from 'react';
import { createGeneralWhatsAppLink, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = createGeneralWhatsAppLink();

  return (
    <aside
      aria-label="WhatsApp Contact Options"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
    >
      
      {/* Tooltip Dialog Card */}
      {showTooltip && (
        <div className="bg-white text-[#3E2723] p-4 rounded-2xl shadow-2xl border border-[#C89D47]/30 max-w-xs animate-in zoom-in-95 duration-200 relative mb-1">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-2.5 right-2.5 text-[#3E2723]/50 hover:text-[#3E2723] p-1"
            aria-label="Dismiss message preview"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#3E2723]">Graceful Bitess WhatsApp</span>
          </div>

          <p className="text-[11px] text-[#3E2723]/75 leading-relaxed mb-3">
            Chat directly with founder <strong>Mandeep Singh</strong> in Aligarh for custom boxes, flavor queries, or instant orders.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on {WHATSAPP_DISPLAY_PHONE}</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowTooltip(!showTooltip)}
          className="hidden sm:flex items-center gap-2 bg-[#3E2723] text-[#F5F0E6] px-3.5 py-2 rounded-full text-xs font-semibold shadow-lg border border-[#C89D47]/30 hover:bg-[#2c1b18] transition-colors cursor-pointer"
        >
          <span>Chat with us</span>
          <span className="text-[10px] text-[#C89D47]">10 AM–6 PM</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group relative"
          aria-label="Chat with Graceful Bitess on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
          <span className="sr-only">Open WhatsApp chat</span>
        </a>
      </div>

    </aside>
  );
};
