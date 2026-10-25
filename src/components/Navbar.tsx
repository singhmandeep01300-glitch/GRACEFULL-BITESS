import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenTracker: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenTracker,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Shop Chocolates', target: 'shop' },
    { label: 'Best Sellers', target: 'shop' },
    { label: 'Chocolate Gifts', target: 'gifting' },
    { label: 'About Us', target: 'story' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigateSection(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F0E6]/95 backdrop-blur-md border-b border-[#3E2723]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2.5 text-left text-inherit group whitespace-nowrap shrink-0"
        >
          <span className="w-8 h-8 rounded-full bg-[#3E2723] text-[#C89D47] flex items-center justify-center font-serif font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
            G
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#3E2723] leading-none">
              Graceful Bitess
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#C89D47] font-semibold mt-0.5">
              Confections &amp; Gifts
            </span>
          </div>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#3E2723]/80">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.target)}
              className="hover:text-[#3E2723] relative py-1 transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C89D47] hover:after:w-full after:transition-all cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Interactive utilities, Track Order & Cart */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Track Order Button */}
          <button
            onClick={onOpenTracker}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#3E2723] bg-white/80 hover:bg-white border border-[#3E2723]/15 transition-all shadow-2xs hover:border-[#C89D47] cursor-pointer"
            aria-label="Track Chocolate Order"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Track Order</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#3E2723]/80 hover:text-[#3E2723] hover:bg-[#3E2723]/5 rounded-full transition-colors relative cursor-pointer"
            aria-label="Search chocolates"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#3E2723]/80 hover:text-[#3E2723] hover:bg-[#3E2723]/5 rounded-full transition-colors relative cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C89D47] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#F5F0E6] bg-[#3E2723] hover:bg-[#2c1b18] rounded-full transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#C89D47]" />
            <span className="hidden md:inline">Bag</span>
            <span className="bg-[#C89D47] text-[#3E2723] px-1.5 py-0.2 rounded-full text-[11px] font-bold tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#3E2723] hover:bg-[#3E2723]/5 rounded-lg cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F5F0E6] border-b border-[#3E2723]/10 px-6 py-5 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#3E2723]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.target)}
                className="text-left py-1 hover:text-[#C89D47] transition-colors border-b border-[#3E2723]/5"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                onOpenTracker();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white text-[#3E2723] font-semibold text-xs border border-[#3E2723]/15 flex items-center justify-between"
            >
              <span>Track Your Order Status</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Live Status</span>
            </button>

            <div className="pt-2 flex items-center justify-between text-xs text-[#3E2723]/70">
              <span>Delivery Hours: 10:00 AM – 6:00 PM</span>
              <span className="font-semibold text-[#C89D47]">Aligarh, UP</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

