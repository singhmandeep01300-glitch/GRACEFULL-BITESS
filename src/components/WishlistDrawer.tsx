import React from 'react';
import { Product } from '../types';
import { Heart, X, Trash2, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#F5F0E6] text-[#3E2723] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#3E2723]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C89D47] fill-[#C89D47]" />
            <h3 className="font-serif text-xl font-bold text-[#3E2723]">Your Wishlist</h3>
            <span className="text-xs bg-[#C89D47]/20 text-[#3E2723] px-2 py-0.5 rounded-full font-bold">
              {wishlistProducts.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#3E2723]/5 text-[#3E2723] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-white text-[#3E2723]/40 mx-auto flex items-center justify-center">
                <Heart className="w-8 h-8 text-[#C89D47]" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#3E2723]">No saved chocolates yet</h4>
              <p className="text-xs text-[#3E2723]/70 max-w-xs mx-auto">
                Tap the heart icon on any chocolate card to save your favourite confections for later.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-3.5 rounded-xl border border-[#3E2723]/10 shadow-xs flex items-center justify-between gap-3"
              >
                <div
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-[#EFE8DC]"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#C89D47]">
                      {product.category}
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#3E2723] line-clamp-1">
                      {product.name}
                    </h5>
                    <span className="text-xs font-bold text-[#3E2723] tabular-nums">
                      From ₹{product.basePrice}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="p-2 bg-[#F5F0E6] hover:bg-[#EFE8DC] text-[#3E2723] rounded-lg text-xs font-semibold flex items-center gap-1"
                    title="View details"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C89D47]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveFromWishlist(product)}
                    className="p-2 text-[#3E2723]/40 hover:text-rose-600 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#3E2723]/10 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-[#3E2723] text-white text-xs font-semibold rounded-xl"
          >
            Continue Browsing
          </button>
        </div>

      </div>
    </div>
  );
};
