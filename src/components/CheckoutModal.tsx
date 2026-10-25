import React, { useState } from 'react';
import { CartItem, CustomerOrderDetails, TrackedOrder } from '../types';
import { ALIGARH_DELIVERY_AREAS } from '../data/products';
import { createTrackedOrderFromCheckout } from '../data/orders';
import { formatWhatsAppOrderMessage, createOrderWhatsAppLink, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';
import { X, MessageCircle, MapPin, Clock, ShieldCheck, CheckCircle2, ChevronRight, AlertCircle, Truck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderPlaced: (trackedOrder: TrackedOrder) => void;
  onTrackOrder: (orderId: string) => void;
  appliedCoupon: string | null;
  globalGiftNote?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderPlaced,
  onTrackOrder,
  appliedCoupon,
  globalGiftNote,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'review' | 'confirmed'>('details');
  const [createdOrderId, setCreatedOrderId] = useState<string>('');

  const [form, setForm] = useState<CustomerOrderDetails>({
    fullName: '',
    phone: '',
    email: '',
    addressLine: '',
    landmark: '',
    area: 'Civil Lines',
    city: 'Aligarh',
    pincode: '202001',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliveryTimeSlot: '1:00 PM – 4:00 PM',
    giftMessage: globalGiftNote || '',
    deliveryInstructions: '',
    paymentMethod: 'whatsapp',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cart.reduce(
    (sum, item) => sum + item.selectedVariant.price * item.quantity,
    0
  );
  const deliveryFee = subtotal >= 999 || subtotal === 0 ? 0 : 49;
  let discount = 0;
  if (appliedCoupon === 'WELCOME10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'SWEETBITES') {
    discount = Math.min(50, subtotal);
  }
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!form.addressLine.trim()) {
      setErrorMsg('Please provide your complete delivery address in Aligarh');
      return;
    }
    setErrorMsg('');
    setStep('review');
  };

  const handleConfirmAndSendWhatsApp = () => {
    const generatedId = `GB-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedOrderId(generatedId);

    const trackedOrder = createTrackedOrderFromCheckout(generatedId, cart, form, total);
    onOrderPlaced(trackedOrder);

    const whatsappUrl = createOrderWhatsAppLink(
      cart,
      form,
      subtotal,
      deliveryFee,
      discount,
      total,
      appliedCoupon || undefined
    );

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Transition to confirmed status
    setStep('confirmed');
  };

  const handleConfirmCOD = () => {
    const generatedId = `GB-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedOrderId(generatedId);

    const trackedOrder = createTrackedOrderFromCheckout(generatedId, cart, form, total);
    onOrderPlaced(trackedOrder);

    setStep('confirmed');
  };

  const previewMessage = formatWhatsAppOrderMessage(
    cart,
    form,
    subtotal,
    deliveryFee,
    discount,
    total,
    appliedCoupon || undefined
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#F5F0E6] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#C89D47]/30 overflow-hidden my-6 text-[#3E2723]">
        
        {/* Header */}
        <div className="bg-white p-5 border-b border-[#3E2723]/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#C89D47] font-semibold">
              Graceful Bitess · Checkout
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3E2723]">
              {step === 'details' && 'Delivery & Contact Details'}
              {step === 'review' && 'Review & WhatsApp Order Confirmation'}
              {step === 'confirmed' && 'Order Request Initiated!'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#3E2723]/60 hover:text-[#3E2723]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          
          {step === 'details' && (
            <form onSubmit={handleProceedToReview} className="space-y-5 text-xs">
              
              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Personal Contact */}
              <div>
                <h4 className="font-bold text-sm text-[#3E2723] mb-3 pb-1 border-b border-[#3E2723]/10">
                  1. Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mandeep Singh"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Phone Number (WhatsApp preferred) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9119076000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-medium mb-1">Email Address (Optional for invoice receipt)</label>
                    <input
                      type="email"
                      placeholder="e.g. customer@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h4 className="font-bold text-sm text-[#3E2723] mb-3 pb-1 border-b border-[#3E2723]/10 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#C89D47]" />
                  <span>2. Delivery Address (Aligarh, UP)</span>
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block font-medium mb-1">House / Flat / Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. House 42, Civil Lines, Near AMU Circle"
                      value={form.addressLine}
                      onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-medium mb-1">Aligarh Area / Locality *</label>
                      <select
                        value={form.area}
                        onChange={(e) => setForm({ ...form, area: e.target.value })}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47]"
                      >
                        {ALIGARH_DELIVERY_AREAS.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Landmark (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Opposite Post Office"
                        value={form.landmark}
                        onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Pincode</label>
                      <input
                        type="text"
                        value={form.pincode}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Timing & Notes */}
              <div>
                <h4 className="font-bold text-sm text-[#3E2723] mb-3 pb-1 border-b border-[#3E2723]/10 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C89D47]" />
                  <span>3. Preferred Delivery Timing (10 AM–6 PM)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block font-medium mb-1">Delivery Date</label>
                    <input
                      type="date"
                      value={form.deliveryDate}
                      onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Preferred Time Slot *</label>
                    <select
                      value={form.deliveryTimeSlot}
                      onChange={(e) => setForm({ ...form, deliveryTimeSlot: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47]"
                    >
                      <option value="10:00 AM – 1:00 PM">Morning Slot (10:00 AM – 1:00 PM)</option>
                      <option value="1:00 PM – 4:00 PM">Afternoon Slot (1:00 PM – 4:00 PM)</option>
                      <option value="4:00 PM – 6:00 PM">Evening Slot (4:00 PM – 6:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Special Delivery Instructions</label>
                  <input
                    type="text"
                    placeholder="e.g. Please call before arriving or leave with security"
                    value={form.deliveryInstructions}
                    onChange={(e) => setForm({ ...form, deliveryInstructions: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47]"
                  />
                </div>
              </div>

              {/* Gift Note if any */}
              <div>
                <label className="block font-medium mb-1">Gift Card Message (Included Free)</label>
                <textarea
                  rows={2}
                  placeholder="Optional message to be handwritten or printed on an elegant card..."
                  value={form.giftMessage}
                  onChange={(e) => setForm({ ...form, giftMessage: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47] resize-none"
                />
              </div>

              {/* Payment Method Choice */}
              <div>
                <h4 className="font-bold text-sm text-[#3E2723] mb-3 pb-1 border-b border-[#3E2723]/10">
                  4. Choose How You Prefer to Order
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                    form.paymentMethod === 'whatsapp'
                      ? 'border-[#3E2723] bg-emerald-50 text-emerald-950 shadow-xs'
                      : 'border-[#3E2723]/15 bg-white text-[#3E2723]'
                  }`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="whatsapp"
                        checked={form.paymentMethod === 'whatsapp'}
                        onChange={() => setForm({ ...form, paymentMethod: 'whatsapp' })}
                        className="text-[#3E2723]"
                      />
                      <span className="font-bold flex items-center gap-1.5 text-xs text-emerald-800">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        Order via WhatsApp (Recommended)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#3E2723]/70 pl-5">
                      Sends pre-filled details to +91 9119076000 for direct instant confirmation with Mandeep Singh.
                    </p>
                  </label>

                  <label className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                    form.paymentMethod === 'cod'
                      ? 'border-[#3E2723] bg-[#EFE8DC] text-[#3E2723] shadow-xs'
                      : 'border-[#3E2723]/15 bg-white text-[#3E2723]'
                  }`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={form.paymentMethod === 'cod'}
                        onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                        className="text-[#3E2723]"
                      />
                      <span className="font-bold text-xs">
                        Cash / UPI on Delivery
                      </span>
                    </div>
                    <p className="text-[11px] text-[#3E2723]/70 pl-5">
                      Pay cash or scan UPI QR code upon arrival at your Aligarh doorstep.
                    </p>
                  </label>
                </div>
              </div>

              {/* Order total strip */}
              <div className="p-4 rounded-xl bg-white border border-[#3E2723]/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#3E2723]/70">Total Amount Payable</span>
                  <p className="font-serif text-2xl font-bold text-[#3E2723] tabular-nums">₹{total}</p>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#3E2723] hover:bg-[#2c1b18] text-[#F5F0E6] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Review Order</span>
                  <ChevronRight className="w-4 h-4 text-[#C89D47]" />
                </button>
              </div>

            </form>
          )}

          {step === 'review' && (
            <div className="space-y-6 text-xs">
              {/* Review instructions */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-[#3E2723] flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-amber-900 mb-0.5">Please Review Your Summary</p>
                  <p className="text-amber-800">
                    {form.paymentMethod === 'whatsapp'
                      ? 'Clicking the button below will open WhatsApp with your pre-formatted order request. Note: Order will be confirmed directly by Mandeep Singh upon reviewing your message.'
                      : 'Confirming below registers your Pay-on-Delivery order for dispatch in Aligarh.'}
                  </p>
                </div>
              </div>

              {/* Items Summary */}
              <div className="bg-white p-4 rounded-xl border border-[#3E2723]/10">
                <h4 className="font-bold text-sm mb-3 text-[#3E2723]">Order Items</h4>
                <div className="space-y-2 mb-3">
                  {cart.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-[#3E2723]/5">
                      <div>
                        <span className="font-semibold text-[#3E2723]">{item.product.name}</span>
                        <span className="text-[11px] text-[#3E2723]/60 block">{item.selectedVariant.name} × {item.quantity}</span>
                      </div>
                      <span className="font-bold tabular-nums">₹{item.selectedVariant.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1 pt-2 border-t border-[#3E2723]/10">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold tabular-nums">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({appliedCoupon}):</span>
                      <span className="font-bold tabular-nums">-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery (Aligarh):</span>
                    <span className="font-bold tabular-nums">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#3E2723] pt-2 border-t">
                    <span>Total Amount:</span>
                    <span className="font-serif text-lg tabular-nums">₹{total}</span>
                  </div>
                </div>
              </div>

              {/* Customer and Delivery details summary */}
              <div className="bg-white p-4 rounded-xl border border-[#3E2723]/10">
                <h4 className="font-bold text-sm mb-2 text-[#3E2723]">Delivery Details</h4>
                <p><strong>Name:</strong> {form.fullName}</p>
                <p><strong>Phone:</strong> {form.phone}</p>
                <p><strong>Address:</strong> {form.addressLine}, {form.area}, {form.city} - {form.pincode}</p>
                {form.landmark && <p><strong>Landmark:</strong> {form.landmark}</p>}
                <p><strong>Preferred Timing:</strong> {form.deliveryDate} ({form.deliveryTimeSlot})</p>
                {form.giftMessage && <p><strong>Gift Message:</strong> &ldquo;{form.giftMessage}&rdquo;</p>}
              </div>

              {/* Pre-filled message preview if WhatsApp */}
              {form.paymentMethod === 'whatsapp' && (
                <div>
                  <label className="block font-semibold mb-1 text-[11px] uppercase tracking-wide text-[#3E2723]/70">
                    Preview of message to be sent to WhatsApp ({WHATSAPP_DISPLAY_PHONE}):
                  </label>
                  <pre className="p-3 bg-white rounded-xl border border-[#3E2723]/20 font-mono text-[11px] whitespace-pre-wrap text-[#3E2723]/80 max-h-36 overflow-y-auto">
                    {previewMessage}
                  </pre>
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2.5 text-xs font-semibold text-[#3E2723]/70 hover:text-[#3E2723]"
                >
                  ← Edit Details
                </button>

                {form.paymentMethod === 'whatsapp' ? (
                  <button
                    type="button"
                    onClick={handleConfirmAndSendWhatsApp}
                    className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order Request to WhatsApp</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleConfirmCOD}
                    className="px-6 py-3.5 bg-[#3E2723] hover:bg-[#2c1b18] text-[#F5F0E6] text-xs font-bold rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#C89D47]" />
                    <span>Confirm Cash on Delivery Order</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#3E2723]">
                Order Request Submitted!
              </h3>

              {/* Generated Order ID Badge */}
              {createdOrderId && (
                <div className="inline-flex items-center gap-2 bg-[#F5F0E6] border border-[#C89D47] px-4 py-2 rounded-xl text-xs">
                  <span className="text-[#3E2723]/70">Your Tracking Number:</span>
                  <span className="font-mono text-sm font-bold text-[#3E2723]">#{createdOrderId}</span>
                </div>
              )}
              
              <div className="max-w-md mx-auto text-xs text-[#3E2723]/80 space-y-2 leading-relaxed bg-white p-5 rounded-2xl border border-[#3E2723]/10">
                <p>
                  Thank you, <strong>{form.fullName}</strong>!
                </p>
                <p>
                  {form.paymentMethod === 'whatsapp'
                    ? `Your order details have been initiated on WhatsApp (${WHATSAPP_DISPLAY_PHONE}). Founder Mandeep Singh will reply to confirm delivery slot and fresh batch dispatch.`
                    : `Your Pay-on-Delivery order has been registered for delivery to ${form.area}, Aligarh. We will call you at ${form.phone} prior to dispatch.`}
                </p>
                <p className="text-[11px] text-[#3E2723]/60 pt-2 border-t border-[#3E2723]/10">
                  Delivery Window: Daily 10:00 AM – 6:00 PM in Aligarh.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                {createdOrderId && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onTrackOrder(createdOrderId);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-emerald-200" />
                    <span>Track Order Status Live</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-[#3E2723] text-white text-xs font-bold rounded-xl hover:bg-[#2c1b18] cursor-pointer"
                >
                  Continue Exploring
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
