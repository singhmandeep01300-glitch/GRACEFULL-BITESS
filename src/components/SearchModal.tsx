import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, X, Star, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  }, [searchTerm, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div className="bg-[#F5F0E6] rounded-2xl max-w-xl w-full shadow-2xl border border-[#C89D47]/30 overflow-hidden text-[#3E2723]">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-[#3E2723]/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C89D47] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search chocolates, truffles, hampers, flavors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm bg-transparent focus:outline-hidden text-[#3E2723] placeholder-[#3E2723]/40"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="text-xs text-[#3E2723]/50 hover:text-[#3E2723] p-1"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#3E2723]/60 hover:text-[#3E2723]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        {!searchTerm && (
          <div className="p-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C89D47] block mb-2">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {['Truffles', 'Dark Chocolate', 'Gift Box', 'Almonds', 'Celebration Hamper', 'Milk Chocolate'].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchTerm(term)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white hover:bg-[#EFE8DC] border border-[#3E2723]/10 text-[#3E2723] transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results List */}
        {searchTerm && (
          <div className="p-4 max-h-96 overflow-y-auto space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-3 bg-white rounded-xl border border-[#3E2723]/5 hover:border-[#C89D47]/40 flex items-center justify-between gap-3 cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-[#EFE8DC]"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#C89D47]">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-[#3E2723] group-hover:text-[#C89D47] transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#3E2723]/70">
                        <span className="font-bold tabular-nums">From ₹{product.basePrice}</span>
                        {product.rating && (
                          <span className="flex items-center gap-0.5 text-[11px]">
                            <Star className="w-3 h-3 fill-[#C89D47] text-[#C89D47]" /> {product.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#3E2723]/40 group-hover:text-[#C89D47] group-hover:translate-x-1 transition-all" />
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-[#3E2723]/70">
                No chocolates found matching &ldquo;{searchTerm}&rdquo;. Try another flavor or keyword.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
