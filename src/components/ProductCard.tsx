import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedVariant, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#3E2723]/10 hover:border-[#C89D47]/40 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE8DC]">
        <ImageWithFallback
          src={product.imageUrl}
          alt={product.name}
          aspectRatioClass="aspect-[4/3]"
          badgeText={product.isBestSeller ? 'Best Seller' : undefined}
        />

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-[#3E2723] text-[#C89D47]'
              : 'bg-white/80 hover:bg-white text-[#3E2723]/70 hover:text-[#3E2723]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C89D47]' : ''}`} />
        </button>

        {/* Sample product notice banner */}
        {product.isSample && (
          <div className="absolute bottom-2 left-2 bg-[#3E2723]/80 text-[#F5F0E6] text-[10px] px-2 py-0.5 rounded-sm backdrop-blur-xs font-mono">
            Sample Product
          </div>
        )}

        {/* Quick View overlay button */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="w-full py-2 bg-white/95 text-[#3E2723] text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-1.5 hover:bg-white transition-colors">
            <Eye className="w-3.5 h-3.5 text-[#C89D47]" /> View Details &amp; Ingredients
          </span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Category & Rating Row (Zero-pill text separator discipline) */}
          <div className="flex items-center justify-between text-xs text-[#3E2723]/60 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[#C89D47] text-[11px]">
              {product.category}
            </span>

            {product.rating ? (
              <div className="flex items-center gap-1 text-[#3E2723]/80">
                <Star className="w-3.5 h-3.5 fill-[#C89D47] text-[#C89D47]" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-[11px] text-[#3E2723]/50">({product.reviewsCount})</span>
              </div>
            ) : (
              <span className="text-[11px] text-[#3E2723]/50">New Batch</span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3E2723] group-hover:text-[#C89D47] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#3E2723]/70 line-clamp-2 mt-1 mb-3">
            {product.shortDescription}
          </p>

          {/* Variant Selector Tabs if multiple variants */}
          {product.variants.length > 1 && (
            <div
              className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1"
              onClick={(e) => e.stopPropagation()}
            >
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`text-[11px] px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    selectedVariant.id === v.id
                      ? 'bg-[#3E2723] text-[#F5F0E6] font-medium'
                      : 'bg-[#F5F0E6] text-[#3E2723]/80 hover:bg-[#EFE8DC]'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing and Add to Bag Row */}
        <div className="pt-3 border-t border-[#3E2723]/10 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#3E2723] tabular-nums">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.originalPrice && (
                <span className="text-xs text-[#3E2723]/40 line-through tabular-nums">
                  ₹{selectedVariant.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-800 font-medium">In Stock · Aligarh Delivery</span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`px-3.5 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              addedNotice
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-[#3E2723] text-[#F5F0E6] hover:bg-[#2c1b18] shadow-xs active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {addedNotice ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C89D47]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
