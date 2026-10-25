import React from 'react';
import { ProductCategory } from '../types';
import { WHATSAPP_DISPLAY_PHONE, createGeneralWhatsAppLink } from '../utils/whatsapp';
import { PolicyType } from './PolicyModals';
import { MessageCircle, MapPin, Clock, Phone, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenPolicy: (policy: PolicyType) => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onSelectCategory,
  onOpenPolicy,
  onOpenTracker,
}) => {
  const currentYear = new Date().getFullYear();

  const categories: ProductCategory[] = [
    'Milk Chocolates',
    'Dark Chocolates',
    'White Chocolates',
    'Chocolate Truffles',
    'Chocolate Gift Boxes',
    'Festive & Rakhi Hampers',
  ];

  return (
    <footer id="contact" className="bg-[#2C1814] text-[#F5F0E6] pt-16 pb-12 border-t border-[#C89D47]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full bg-[#C89D47] text-[#2C1814] flex items-center justify-center font-serif font-bold text-xl">
                G
              </span>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                  Graceful Bitess
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#C89D47] font-semibold mt-0.5 block">
                  Artisanal Chocolaterie
                </span>
              </div>
            </div>

            <p className="font-serif italic text-base text-[#D7CCC8] leading-relaxed">
              &ldquo;A Little Bite of Happiness.&rdquo;
            </p>
            <p className="text-xs text-[#D7CCC8]/80 leading-relaxed">
              Handcrafted with Love. Made to Make You Smile. Founded by Mandeep Singh to share exquisite chocolate moments across Aligarh.
            </p>

            <div className="pt-2">
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {WHATSAPP_DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C89D47]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#D7CCC8]">
              {['Hero', 'Shop Chocolates', 'Best Sellers', 'Chocolate Gifts', 'About Us'].map((item) => {
                const target =
                  item === 'Hero'
                    ? 'hero'
                    : item === 'Shop Chocolates'
                    ? 'shop'
                    : item === 'Best Sellers'
                    ? 'shop'
                    : item === 'Chocolate Gifts'
                    ? 'gifting'
                    : 'story';
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => onNavigateSection(target)}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  type="button"
                  onClick={onOpenTracker}
                  className="text-[#C89D47] hover:text-white font-semibold transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Track Order</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Categories (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C89D47]">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#D7CCC8]">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigateSection('shop');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Local Delivery Details (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C89D47]">
              Aligarh Store &amp; Delivery
            </h4>

            <div className="space-y-2.5 text-xs text-[#D7CCC8]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C89D47] shrink-0 mt-0.5" />
                <span>
                  Aligarh, Uttar Pradesh, India<br />
                  <span className="text-[11px] text-[#D7CCC8]/60">Local Doorstep Delivery across City</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C89D47] shrink-0" />
                <span>Delivery Timings: 10:00 AM – 6:00 PM</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C89D47] shrink-0" />
                <span>Founder: Mandeep Singh</span>
              </div>

              <div className="pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#D7CCC8] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C89D47] shrink-0" />
                  <span>Free delivery on orders above ₹999 in Aligarh!</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Policies Row */}
        <div className="pt-8 pb-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#D7CCC8]/70 border-b border-white/5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-[#F5F0E6] transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-[#F5F0E6] transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenPolicy('shipping')}
              className="hover:text-[#F5F0E6] transition-colors"
            >
              Shipping &amp; Delivery Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenPolicy('returns')}
              className="hover:text-[#F5F0E6] transition-colors"
            >
              Returns &amp; Refunds Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenPolicy('allergen')}
              className="hover:text-[#F5F0E6] transition-colors"
            >
              Allergen &amp; Food Information
            </button>
          </div>

          <div className="text-[11px]">
            Currency: Indian Rupees (₹) · English
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#D7CCC8]/50 gap-2">
          <p>© {currentYear} Graceful Bitess. All rights reserved.</p>
          <p>Handcrafted Confectionery &amp; Gourmet Gifts in Aligarh, Uttar Pradesh.</p>
        </div>

      </div>
    </footer>
  );
};
