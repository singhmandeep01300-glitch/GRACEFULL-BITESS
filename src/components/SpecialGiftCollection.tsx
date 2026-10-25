import React, { useState } from 'react';
import { Gift, Sparkles, Send, Check } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface SpecialGiftCollectionProps {
  onShopGifts: () => void;
  onSetGlobalGiftNote: (note: string) => void;
}

export const SpecialGiftCollection: React.FC<SpecialGiftCollectionProps> = ({
  onShopGifts,
  onSetGlobalGiftNote,
}) => {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [customMessage, setCustomMessage] = useState(
    'Wishing you moments as sweet and joyous as these handcrafted chocolates. Happy Celebrations!'
  );
  const [isSaved, setIsSaved] = useState(false);

  const occasions = [
    'Birthdays 🎂',
    'Anniversaries 🥂',
    'Raksha Bandhan 🌸',
    'Festivals ✨',
    'Corporate Thanks 💼',
    'Just Because 🍫',
  ];

  const handleSaveToOrder = () => {
    const fullNote = `To: ${recipientName || 'Someone Special'}\n"${customMessage}"\nFrom: ${senderName || 'With Love'}`;
    onSetGlobalGiftNote(fullNote);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <section id="gifting" className="py-16 sm:py-24 bg-gradient-to-b from-[#F5F0E6] via-[#EFE8DC] to-[#F5F0E6] border-t border-[#3E2723]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#C89D47] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Gifting With Heart
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3E2723] mt-2 mb-3">
            Special Gift Collection
          </h2>
          <p className="text-sm sm:text-base text-[#3E2723]/75">
            Crafted for life’s sweetest milestones. Celebrate birthdays, anniversaries, Rakhi, and festive gatherings with customized chocolate gift hampers.
          </p>

          {/* Occasion Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {occasions.map((occ) => (
              <span
                key={occ}
                className="text-xs bg-white/70 border border-[#3E2723]/10 px-3 py-1 rounded-full text-[#3E2723]/80 font-medium"
              >
                {occ}
              </span>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Visual Packaging Showcase & Interactive Gift Card Customizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Premium Packaging visual */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-8 border border-[#3E2723]/10 shadow-sm">
            <div>
              <div className="rounded-xl overflow-hidden mb-6 shadow-md border border-[#3E2723]/5">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
                  alt="Graceful Bitess Luxury Gift Packaging"
                  aspectRatioClass="aspect-[16/10]"
                  badgeText="Complimentary Gift Packaging"
                />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-[#C89D47]">
                Unboxing Experience
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#3E2723] mt-1 mb-3">
                Keepsake Boxes &amp; Satin Ribbons
              </h3>
              <p className="text-xs sm:text-sm text-[#3E2723]/75 leading-relaxed mb-6">
                Every gift box from Graceful Bitess arrives adorned in our signature deep chocolate brown aesthetic, golden foil crest, and delicate ivory tissue wrap to ensure your recipient feels celebrated before taking their very first bite.
              </p>
            </div>

            <button
              type="button"
              onClick={onShopGifts}
              className="w-full py-3.5 bg-[#3E2723] hover:bg-[#2c1b18] text-[#F5F0E6] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Gift className="w-4 h-4 text-[#C89D47]" />
              <span>Shop All Gift Hampers</span>
            </button>
          </div>

          {/* Right Column: Interactive Personal Message Card Simulator */}
          <div className="lg:col-span-6 bg-[#3E2723] text-[#F5F0E6] rounded-2xl p-6 sm:p-8 border border-[#C89D47]/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C89D47]" />
                  <span className="text-xs uppercase tracking-wider text-[#C89D47] font-semibold">
                    Interactive Gift Card Preview
                  </span>
                </div>
                <span className="text-[11px] text-[#D7CCC8]">Included Free With Every Gift</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Personalize Your Message
              </h3>
              <p className="text-xs text-[#D7CCC8] mb-6">
                Type your personal message below. We print it on an elegant heavy-stock embossed card tucked right inside the chocolate box.
              </p>

              {/* Input fields */}
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#D7CCC8] mb-1">To (Recipient Name)</label>
                    <input
                      type="text"
                      placeholder="e.g., Ananya / Mom & Dad"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-white placeholder-white/40 focus:outline-hidden focus:border-[#C89D47]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#D7CCC8] mb-1">From (Your Name)</label>
                    <input
                      type="text"
                      placeholder="e.g., Mandeep / Rahul"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-white placeholder-white/40 focus:outline-hidden focus:border-[#C89D47]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#D7CCC8] mb-1">Your Personal Message</label>
                  <textarea
                    rows={3}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-white placeholder-white/40 focus:outline-hidden focus:border-[#C89D47] resize-none"
                    placeholder="Write your wishes here..."
                  />
                </div>
              </div>

              {/* Physical Card Simulation Display */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#F5F0E6] text-[#3E2723] shadow-md border-2 border-[#C89D47]/40 relative">
                <div className="text-[10px] uppercase tracking-widest text-[#C89D47] font-serif font-bold text-center border-b border-[#3E2723]/10 pb-2 mb-2">
                  Graceful Bitess · Personal Greetings
                </div>
                <p className="text-xs font-semibold mb-1">
                  Dear {recipientName.trim() || '[Recipient Name]'},
                </p>
                <p className="font-serif italic text-sm text-[#3E2723]/90 leading-relaxed mb-3 min-h-[40px]">
                  &ldquo;{customMessage.trim() || 'Write your message...'}&rdquo;
                </p>
                <p className="text-xs text-right font-semibold text-[#C89D47]">
                  With love, {senderName.trim() || '[Your Name]'}
                </p>
              </div>
            </div>

            {/* Save Card Button */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#D7CCC8]">
                Attach this card to your current cart order?
              </span>
              <button
                type="button"
                onClick={handleSaveToOrder}
                className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#C89D47] hover:bg-[#b58c3a] text-[#3E2723]'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Card Attached!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Attach to Order</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
