import React, { useState } from 'react';
import { Sparkles, Heart, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const BrandStory: React.FC = () => {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <section id="story" className="py-16 sm:py-24 bg-[#F5F0E6] border-t border-[#3E2723]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Story Mosaic */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#3E2723]/10 bg-white">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80"
                alt="Graceful Bitess Cocoa Craftsmanship"
                aspectRatioClass="aspect-[4/5]"
              />

              {/* Quote overlay card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#3E2723]/95 backdrop-blur-md text-[#F5F0E6] border border-[#C89D47]/30">
                <p className="font-serif italic text-sm text-[#F5F0E6]/95 leading-relaxed mb-2">
                  &ldquo;A Little Bite of Happiness. Handcrafted with Love. Made to Make You Smile.&rdquo;
                </p>
                <div className="text-[11px] text-[#C89D47] font-semibold tracking-wider uppercase">
                  Mandeep Singh · Founder, Graceful Bitess
                </div>
              </div>
            </div>

            {/* Established in Aligarh pill */}
            <div className="absolute -top-4 -right-4 bg-white border border-[#C89D47]/40 shadow-lg px-4 py-2 rounded-xl text-xs font-semibold text-[#3E2723] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C89D47]" />
              <span>Founded in Aligarh, UP</span>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C89D47] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Roots &amp; Mission</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3E2723] mb-6 leading-tight">
              Every Bite Has a Story.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#3E2723]/80 leading-relaxed">
              <p>
                Founded by <strong>Mandeep Singh</strong> in Aligarh, Uttar Pradesh, <strong>Graceful Bitess</strong> was born out of a simple, heartfelt belief: that genuine, artisanal chocolate can transform an ordinary day into something unforgettable.
              </p>
              <p>
                What began as a quiet passion for tempering fine cocoa and experimenting with velvety ganache textures quickly blossomed into an online boutique chocolaterie dedicated to bringing premium confections directly to doorsteps across Aligarh.
              </p>

              {showFullStory && (
                <div className="space-y-4 pt-2 text-[#3E2723]/85 animate-in fade-in duration-300">
                  <p>
                    We select aromatic cocoa beans, high-grade cocoa butter, and authentic roasted nuts, carefully conching and tempering each recipe to achieve that clean, satisfying snap and silky, lingering melt.
                  </p>
                  <p>
                    Whether you are surprising someone for their birthday, choosing a festive Rakhi hamper, sending heartfelt thanks to a friend, or indulging yourself after a long workday, we promise every piece is created with genuine care and delivered fresh in temperature-conscious packaging.
                  </p>
                </div>
              )}
            </div>

            {/* Core Values Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8 pt-6 border-t border-[#3E2723]/10">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-[#C89D47] shrink-0" />
                <span className="text-xs font-semibold text-[#3E2723]">Handcrafted With Care</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#C89D47] shrink-0" />
                <span className="text-xs font-semibold text-[#3E2723]">Pure Cocoa Butter</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <span className="w-5 h-5 rounded-full bg-[#C89D47]/20 text-[#C89D47] flex items-center justify-center text-xs font-bold shrink-0">📍</span>
                <span className="text-xs font-semibold text-[#3E2723]">Aligarh Local Dispatch</span>
              </div>
            </div>

            {/* Toggle Full Story CTA */}
            <div>
              <button
                type="button"
                onClick={() => setShowFullStory(!showFullStory)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#3E2723]/20 hover:border-[#3E2723] text-xs font-semibold text-[#3E2723] hover:bg-[#3E2723]/5 transition-all cursor-pointer"
              >
                <span>{showFullStory ? 'Show Less' : 'Read Our Full Journey'}</span>
                {showFullStory ? (
                  <ChevronUp className="w-4 h-4 text-[#C89D47]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#C89D47]" />
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
