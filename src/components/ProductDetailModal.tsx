import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { createProductInquiryWhatsAppLink } from '../utils/whatsapp';
import { X, Star, Plus, Minus, ShoppingBag, Zap, Share2, ShieldAlert, Clock, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onBuyNow: (product: Product, variant: ProductVariant, quantity: number) => void;
  allProducts: Product[];
  onSelectRelated: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  allProducts,
  onSelectRelated,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.imageUrl);
  const [showAddedNotice, setShowAddedNotice] = useState(false);

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setShowAddedNotice(true);
    setTimeout(() => setShowAddedNotice(false), 1500);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedVariant, quantity);
    onClose();
  };

  const whatsappInquiryUrl = createProductInquiryWhatsAppLink(product);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#F5F0E6] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#C89D47]/30 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#3E2723] flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Image Showcase */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white border-b md:border-b-0 md:border-r border-[#3E2723]/10">
            <div>
              <div className="rounded-xl overflow-hidden shadow-md border border-[#3E2723]/10 mb-4 bg-[#EFE8DC]">
                <ImageWithFallback
                  src={activeImage}
                  alt={product.name}
                  aspectRatioClass="aspect-square"
                  badgeText={product.isBestSeller ? 'Best Seller' : undefined}
                />
              </div>

              {/* Thumbnails if secondary image exists */}
              {product.secondaryImageUrl && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveImage(product.imageUrl)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer ${
                      activeImage === product.imageUrl
                        ? 'border-[#C89D47]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImage(product.secondaryImageUrl!)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer ${
                      activeImage === product.secondaryImageUrl
                        ? 'border-[#C89D47]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={product.secondaryImageUrl}
                      alt={`${product.name} detail`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Verification and Sample Disclaimer */}
            <div className="mt-6 pt-4 border-t border-[#3E2723]/10 text-[11px] text-[#3E2723]/70 space-y-1">
              <div className="flex items-center gap-1.5 text-[#C89D47] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Graceful Bitess Confectionery Quality</span>
              </div>
              <p>Handcrafted in small batches in Aligarh. Dispatched fresh daily.</p>
              {product.isSample && (
                <p className="text-[#3E2723]/50 italic">
                  Note: Sample catalog item. Fresh batch specifications confirmed upon order.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Specifications */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between text-[#3E2723]">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="uppercase tracking-wider font-semibold text-[#C89D47]">
                  {product.category}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1 text-[#3E2723]">
                    <Star className="w-4 h-4 fill-[#C89D47] text-[#C89D47]" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-xs text-[#3E2723]/60">({product.reviewsCount} reviews)</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723] mb-2">
                {product.name}
              </h2>

              {/* Price display updated by variant */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-3xl font-bold text-[#3E2723] tabular-nums">
                  ₹{selectedVariant.price}
                </span>
                {selectedVariant.originalPrice && (
                  <span className="text-sm text-[#3E2723]/40 line-through tabular-nums">
                    ₹{selectedVariant.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded-sm">
                  In Stock for Aligarh
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#3E2723]/80 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Variant Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#3E2723] mb-2 uppercase tracking-wide">
                  Select Size / Package Option
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 text-left rounded-xl border text-xs transition-all cursor-pointer ${
                        selectedVariant.id === v.id
                          ? 'border-[#3E2723] bg-[#3E2723] text-white shadow-xs'
                          : 'border-[#3E2723]/15 bg-white text-[#3E2723] hover:border-[#C89D47]'
                      }`}
                    >
                      <div className="font-semibold">{v.name}</div>
                      <div className="text-[11px] opacity-80 tabular-nums">₹{v.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wide">Quantity:</span>
                <div className="flex items-center border border-[#3E2723]/20 bg-white rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-[#F5F0E6] text-[#3E2723] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-[#F5F0E6] text-[#3E2723] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs text-[#3E2723]/60 tabular-nums">
                  Total: ₹{selectedVariant.price * quantity}
                </span>
              </div>

              {/* Action Buttons: Add to Bag & Buy Now */}
              <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 py-3 px-4 bg-[#3E2723] hover:bg-[#2c1b18] text-[#F5F0E6] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C89D47]" />
                  <span>{showAddedNotice ? 'Added to Bag!' : 'Add to Bag'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-4 bg-[#C89D47] hover:bg-[#b58c3a] text-[#3E2723] text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-[#3E2723]" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Share on WhatsApp button */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl border border-emerald-600/30 text-emerald-800 hover:bg-emerald-50 text-xs font-medium flex items-center justify-center gap-2 transition-colors mb-6"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Inquire &amp; Order on WhatsApp (+91 9119076000)</span>
              </a>

              {/* Detailed Specs Accordions */}
              <div className="border-t border-[#3E2723]/10 pt-4 space-y-3 text-xs">
                
                {/* Ingredients & Allergens */}
                <div className="bg-white/70 p-3 rounded-xl border border-[#3E2723]/10">
                  <div className="font-semibold text-[#3E2723] flex items-center gap-1.5 mb-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#C89D47]" />
                    <span>Ingredients &amp; Allergen Notice</span>
                  </div>
                  <p className="text-[#3E2723]/80 leading-relaxed mb-1">
                    {product.ingredients.join(', ')}.
                  </p>
                  <p className="text-[11px] font-semibold text-[#3E2723]/70">
                    Allergens: {product.allergens.join(' · ')}
                  </p>
                </div>

                {/* Storage & Shelf life */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white/70 p-2.5 rounded-xl border border-[#3E2723]/10">
                    <span className="font-semibold block text-[#3E2723]">Storage:</span>
                    <span className="text-[#3E2723]/70">{product.storageInstructions}</span>
                  </div>
                  <div className="bg-white/70 p-2.5 rounded-xl border border-[#3E2723]/10">
                    <span className="font-semibold block text-[#3E2723]">Shelf Life:</span>
                    <span className="text-[#3E2723]/70">{product.shelfLife}</span>
                  </div>
                </div>

                {/* Delivery Time Window */}
                <div className="flex items-center gap-2 text-[11px] text-[#3E2723]/70 pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#C89D47] shrink-0" />
                  <span>
                    Aligarh Delivery: 10:00 AM – 6:00 PM. Order before 3 PM for same-day delivery confirmation.
                  </span>
                </div>

              </div>

            </div>

            {/* Related products carousel */}
            {relatedProducts.length > 0 && (
              <div className="mt-8 pt-4 border-t border-[#3E2723]/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C89D47] block mb-3">
                  You May Also Love
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {relatedProducts.map((rel) => (
                    <button
                      key={rel.id}
                      type="button"
                      onClick={() => onSelectRelated(rel)}
                      className="text-left group cursor-pointer"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-white mb-1 border border-[#3E2723]/10">
                        <img
                          src={rel.imageUrl}
                          alt={rel.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-[11px] font-medium text-[#3E2723] line-clamp-1 group-hover:text-[#C89D47]">
                        {rel.name}
                      </p>
                      <span className="text-[10px] text-[#3E2723]/60 font-semibold tabular-nums">
                        ₹{rel.basePrice}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
