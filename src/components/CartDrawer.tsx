import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.selectedVariant.price * item.quantity,
    0
  );

  // Delivery calculation: Free over ₹999, else ₹49 in Aligarh
  const deliveryFee = subtotal >= 999 || subtotal === 0 ? 0 : 49;

  // Coupon discount calculation
  let discount = 0;
  if (appliedCoupon === 'WELCOME10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'SWEETBITES') {
    discount = Math.min(50, subtotal);
  }

  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = onApplyCoupon(couponInput.trim().toUpperCase());
    if (ok) {
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or SWEETBITES');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#F5F0E6] text-[#3E2723] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#3E2723]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C89D47]" />
            <h3 className="font-serif text-xl font-bold text-[#3E2723]">Your Chocolate Bag</h3>
            <span className="text-xs bg-[#C89D47]/20 text-[#3E2723] px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((totalQty, item) => totalQty + item.quantity, 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#3E2723]/5 text-[#3E2723] transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Progress Indicator */}
        <div className="px-5 py-3 bg-[#EFE8DC] border-b border-[#3E2723]/10 text-xs text-[#3E2723]">
          {subtotal >= 999 ? (
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C89D47]" />
              <span>You unlocked FREE doorstep delivery in Aligarh!</span>
            </div>
          ) : (
            <div>
              <span>Add </span>
              <strong className="text-[#3E2723]">₹{999 - subtotal}</strong>
              <span> more to get <strong>FREE delivery</strong> in Aligarh!</span>
              <div className="w-full bg-[#3E2723]/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#C89D47] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 999) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-white text-[#3E2723]/40 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-[#C89D47]" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#3E2723]">Your bag is empty</h4>
              <p className="text-xs text-[#3E2723]/70 max-w-xs mx-auto">
                Explore our handcrafted truffles, artisanal dark bars, and festive celebration hampers.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#3E2723] text-[#F5F0E6] text-xs font-semibold rounded-full"
              >
                Browse Chocolates
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedVariant.id}-${index}`}
                className="bg-white p-3.5 rounded-xl border border-[#3E2723]/10 shadow-xs flex gap-3 relative"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#EFE8DC] shrink-0 border border-[#3E2723]/5">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="pr-6">
                    <h5 className="font-serif text-sm font-bold text-[#3E2723] line-clamp-1">
                      {item.product.name}
                    </h5>
                    <span className="text-[11px] text-[#C89D47] font-semibold block">
                      {item.selectedVariant.name}
                    </span>
                    <span className="text-xs font-bold text-[#3E2723] tabular-nums mt-0.5 block">
                      ₹{item.selectedVariant.price}
                    </span>
                  </div>

                  {/* Quantity and Delete */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#3E2723]/5">
                    <div className="flex items-center border border-[#3E2723]/20 rounded-md overflow-hidden bg-[#F5F0E6]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-[#EFE8DC] text-[#3E2723] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold tabular-nums">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-[#EFE8DC] text-[#3E2723] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#3E2723] tabular-nums">
                      ₹{item.selectedVariant.price * item.quantity}
                    </span>
                  </div>
                </div>

                {/* Remove item button */}
                <button
                  type="button"
                  onClick={() => onRemoveItem(index)}
                  className="absolute top-2.5 right-2.5 text-[#3E2723]/40 hover:text-rose-600 transition-colors p-1"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#3E2723]/10 space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon Applied: {appliedCoupon} (-₹{discount})</span>
                  </div>
                  <button
                    type="button"
                    onClick={onRemoveCoupon}
                    className="text-[11px] underline text-emerald-900 hover:text-rose-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#3E2723]/40" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. WELCOME10)"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-[#F5F0E6] rounded-lg border border-[#3E2723]/20 focus:outline-hidden uppercase placeholder-normal"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#3E2723] text-white text-xs font-semibold rounded-lg hover:bg-[#2c1b18]"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#3E2723]/80 pt-2 border-t border-[#3E2723]/10">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-semibold tabular-nums">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Aligarh Local Delivery</span>
                <span className="font-semibold tabular-nums">
                  {deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#3E2723] pt-2 border-t border-[#3E2723]/10">
                <span>Estimated Total</span>
                <span className="font-serif text-lg text-[#3E2723] tabular-nums">₹{total}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 bg-[#3E2723] hover:bg-[#2c1b18] text-[#F5F0E6] text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#C89D47]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
