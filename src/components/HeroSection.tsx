import React from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onShopClick: () => void;
  onGiftsClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick, onGiftsClick }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#F5F0E6] via-[#EFE8DC] to-[#F5F0E6]">
      {/* Subtle organic decorative background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C89D47]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#3E2723]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C89D47] mb-4">
              <Sparkles className="w-4 h-4 text-[#C89D47]" />
              <span>A Little Bite of Happiness</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#3E2723]/70 font-normal normal-case">Handcrafted in Aligarh</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3E2723] tracking-tight leading-[1.1] mb-6 text-balance">
              Indulge in Every <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#C89D47]">Little Moment.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#3E2723]/80 leading-relaxed max-w-xl mb-8">
              Discover delightful chocolates crafted to turn ordinary moments into extraordinary memories. Handcrafted with love and delivered fresh across Aligarh.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onShopClick}
                className="px-7 py-3.5 bg-[#3E2723] text-[#F5F0E6] hover:bg-[#2c1b18] text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>Shop Chocolates</span>
                <ArrowRight className="w-4 h-4 text-[#C89D47] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onGiftsClick}
                className="px-7 py-3.5 bg-transparent border border-[#3E2723]/30 hover:border-[#3E2723] text-[#3E2723] hover:bg-[#3E2723]/5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer"
              >
                Explore Gift Boxes
              </button>
            </div>

            {/* Regional Trust markers row */}
            <div className="pt-6 border-t border-[#3E2723]/10 grid grid-cols-3 gap-4 max-w-lg text-xs text-[#3E2723]/80">
              <div className="flex flex-col">
                <span className="font-bold text-[#3E2723] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C89D47]" /> Aligarh
                </span>
                <span className="text-[11px] text-[#3E2723]/60">Local Doorstep Delivery</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#3E2723] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C89D47]" /> 10 AM – 6 PM
                </span>
                <span className="text-[11px] text-[#3E2723]/60">Fresh Daily Batches</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#3E2723] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C89D47]" /> Pure Cocoa
                </span>
                <span className="text-[11px] text-[#3E2723]/60">Fine Ingredients</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Product Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Luxury Hero Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#C89D47]/20 bg-[#3E2723] group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1000&q=85"
                  alt="Graceful Bitess Signature Handcrafted Chocolates"
                  aspectRatioClass="aspect-[4/3] sm:aspect-[16/10]"
                />
                
                {/* Floating caption card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#3E2723]/90 backdrop-blur-md text-[#F5F0E6] border border-[#C89D47]/30 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#C89D47] font-semibold">Artisan Signature</p>
                    <p className="font-serif text-base font-semibold">Chocolate Truffle &amp; Dark Selection</p>
                  </div>
                  <span className="font-serif text-lg text-[#C89D47] font-bold">From ₹180</span>
                </div>
              </div>

              {/* Decorative mini badge card */}
              <div className="hidden sm:flex absolute -top-5 -left-5 bg-[#F5F0E6] border border-[#C89D47]/40 shadow-lg p-3 rounded-xl items-center gap-3 max-w-[200px]">
                <div className="w-9 h-9 rounded-full bg-[#C89D47]/15 flex items-center justify-center text-[#C89D47] shrink-0 font-bold">
                  ★
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#3E2723]/60">Handmade With Love</p>
                  <p className="text-xs font-semibold text-[#3E2723]">Aligarh’s Boutique Chocolaterie</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
