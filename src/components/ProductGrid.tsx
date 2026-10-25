import React, { useState } from 'react';
import { Product, ProductCategory, ProductVariant } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories: ProductCategory[] = [
    'All',
    'Milk Chocolates',
    'Dark Chocolates',
    'White Chocolates',
    'Chocolate Truffles',
    'Chocolate Gift Boxes',
    'Festive & Rakhi Hampers',
    'Birthday Gifts',
    'Custom Chocolate Boxes',
  ];

  // Filtering
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
    if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // featured default
  });

  return (
    <section id="shop" className="py-16 sm:py-20 bg-[#F5F0E6] border-t border-[#3E2723]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#C89D47]">
              Fresh Handcrafted Confections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723] mt-1">
              {selectedCategory === 'All' ? 'Our Chocolate Collection' : selectedCategory}
            </h2>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span className="text-xs text-[#3E2723]/60 hidden sm:inline">
              Showing {sortedProducts.length} handcrafted items
            </span>
            {/* Sort Select */}
            <div className="flex items-center gap-1.5 text-xs bg-white border border-[#3E2723]/15 rounded-lg px-3 py-2 text-[#3E2723]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C89D47]" />
              <label htmlFor="sort-select" className="sr-only">Sort products</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-transparent font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Functional button controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#3E2723] text-[#F5F0E6] shadow-xs'
                  : 'bg-white/80 hover:bg-white text-[#3E2723]/80 border border-[#3E2723]/10 hover:border-[#C89D47]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid (3 columns desktop, 2 columns tablet) */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-[#3E2723]/20">
            <p className="font-serif text-xl text-[#3E2723] mb-2">No chocolates found in this category.</p>
            <p className="text-sm text-[#3E2723]/70 mb-4">We are preparing fresh seasonal recipes for this section.</p>
            <button
              type="button"
              onClick={() => onSelectCategory('All')}
              className="px-5 py-2.5 bg-[#3E2723] text-[#F5F0E6] text-xs font-semibold rounded-full"
            >
              View All Chocolates
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
