import React from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { ProductCategory } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-16 sm:py-20 bg-[#F5F0E6] border-t border-[#3E2723]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#C89D47]">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723] mt-1">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-[#3E2723]/70 max-w-md mt-2 md:mt-0">
            From single-origin dark bars to festive celebration hampers, explore our handcrafted chocolate ranges.
          </p>
        </div>

        {/* 8-Card Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => onSelectCategory(cat.name as ProductCategory)}
              className="group text-left rounded-xl overflow-hidden bg-white/60 hover:bg-white border border-[#3E2723]/8 hover:border-[#C89D47]/50 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-square">
                <ImageWithFallback
                  src={cat.imageUrl}
                  alt={cat.name}
                  aspectRatioClass="aspect-square"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/80 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />
                
                {/* Arrow indicator */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#F5F0E6]/90 text-[#3E2723] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#C89D47]" />
                </div>

                {/* Subtitle / variant count */}
                <div className="absolute bottom-3 left-3 right-3 text-[#F5F0E6]">
                  <span className="text-[10px] tracking-wider uppercase text-[#D7CCC8] font-medium block">
                    {cat.itemCount}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-semibold leading-tight text-white drop-shadow-xs">
                    {cat.name}
                  </h3>
                </div>
              </div>

              <div className="p-3 text-xs text-[#3E2723]/70 hidden sm:block">
                <p className="line-clamp-1">{cat.description}</p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
