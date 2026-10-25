import React, { useState, useEffect } from 'react';
import { TrackedOrder } from '../types';
import { SAMPLE_ORDERS } from '../data/orders';
import { WHATSAPP_DISPLAY_PHONE, WHATSAPP_PHONE_NUMBER } from '../utils/whatsapp';
import {
  X,
  Search,
  Package,
  Clock,
  MapPin,
  CheckCircle2,
  Truck,
  Sparkles,
  MessageCircle,
  HelpCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
  userOrders?: TrackedOrder[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
  userOrders = [],
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<TrackedOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Combine user placed orders with sample orders
  const allOrders = [...userOrders, ...SAMPLE_ORDERS];

  useEffect(() => {
    if (initialOrderId) {
      setSearchInput(initialOrderId);
      handleLookup(initialOrderId);
    } else if (!activeOrder) {
      // Default to sample order GB-1042 so the user immediately sees a rich view
      setActiveOrder(allOrders[0]);
      setSearchInput(allOrders[0].orderId);
    }
  }, [initialOrderId, isOpen]);

  if (!isOpen) return null;

  const handleLookup = (idToSearch: string) => {
    const cleanId = idToSearch.trim().toUpperCase();
    if (!cleanId) return;

    setHasSearched(true);
    // Find by exact match or substring or numerical digits match
    const found = allOrders.find(
      (o) =>
        o.orderId.toUpperCase() === cleanId ||
        o.orderId.toUpperCase().replace(/\D/g, '') === cleanId.replace(/\D/g, '') ||
        o.phone.replace(/\D/g, '').includes(cleanId.replace(/\D/g, ''))
    );

    if (found) {
      setActiveOrder(found);
      setNotFound(false);
    } else {
      setActiveOrder(null);
      setNotFound(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLookup(searchInput);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Processing':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Out for Delivery':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  const getStatusIcon = (status: string, isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) {
      return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
    }
    if (isCurrent) {
      switch (status) {
        case 'Confirmed':
          return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
        case 'Processing':
          return <Sparkles className="w-5 h-5 text-amber-600 animate-pulse" />;
        case 'Out for Delivery':
          return <Truck className="w-5 h-5 text-purple-600 animate-bounce" />;
        case 'Delivered':
          return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
        default:
          return <Package className="w-5 h-5 text-[#C89D47]" />;
      }
    }
    return <div className="w-4 h-4 rounded-full border-2 border-stone-300 bg-white" />;
  };

  const handleWhatsAppInquiry = () => {
    const text = activeOrder
      ? `Hello Graceful Bitess! I would like to check on the delivery timing for my Order *#${activeOrder.orderId}* (${activeOrder.customerName}, ${activeOrder.deliveryArea}). Current status shows: ${activeOrder.status}.`
      : `Hello Graceful Bitess! I have a question regarding my chocolate order in Aligarh.`;
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#F5F0E6] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#C89D47]/30 overflow-hidden my-6 text-[#3E2723] max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-white p-5 border-b border-[#3E2723]/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3E2723] text-[#C89D47] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#3E2723] leading-none">
                Track Chocolate Order
              </h3>
              <p className="text-[11px] text-[#3E2723]/60 mt-0.5">
                Fresh Dispatch &amp; Doorstep Delivery across Aligarh (10 AM–6 PM)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#3E2723]/60 hover:text-[#3E2723] rounded-full hover:bg-[#3E2723]/5"
            aria-label="Close tracking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Search Input Box */}
          <div className="bg-white p-4 rounded-xl border border-[#3E2723]/10 shadow-xs">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3E2723]/40" />
                <input
                  type="text"
                  placeholder="Enter Order # (e.g. GB-1042) or mobile number"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#F5F0E6] rounded-lg border border-[#3E2723]/20 focus:outline-hidden focus:border-[#C89D47] font-mono uppercase placeholder-normal text-[#3E2723]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#3E2723] hover:bg-[#2c1b18] text-[#F5F0E6] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <span>Track Status</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C89D47]" />
              </button>
            </form>

            {/* Quick Demo Order Chips */}
            <div className="mt-3 pt-3 border-t border-[#3E2723]/8 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] text-[#3E2723]/60 font-medium">Try Sample Orders:</span>
              {[
                { id: 'GB-1104', label: 'GB-1104 (Confirmed)' },
                { id: 'GB-1089', label: 'GB-1089 (Processing)' },
                { id: 'GB-1042', label: 'GB-1042 (Out for Delivery)' },
                { id: 'GB-1015', label: 'GB-1015 (Delivered)' },
              ].map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setSearchInput(sample.id);
                    handleLookup(sample.id);
                  }}
                  className={`px-2.5 py-1 text-[11px] rounded-md border transition-all cursor-pointer ${
                    activeOrder?.orderId === sample.id
                      ? 'bg-[#3E2723] text-[#F5F0E6] border-[#3E2723] font-semibold'
                      : 'bg-[#F5F0E6] hover:bg-[#EFE8DC] text-[#3E2723]/80 border-[#3E2723]/15'
                  }`}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Not Found State */}
          {notFound && (
            <div className="p-6 bg-white rounded-xl border border-rose-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#3E2723]">
                Order &ldquo;{searchInput}&rdquo; Not Found
              </h4>
              <p className="text-xs text-[#3E2723]/70 max-w-sm mx-auto">
                Please double-check your order number or click one of the sample orders above. If you ordered directly via WhatsApp, Mandeep Singh can provide live status.
              </p>
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask on WhatsApp (+91 9119076000)</span>
              </button>
            </div>
          )}

          {/* Order Found Details */}
          {activeOrder && (
            <div className="space-y-6">
              
              {/* Order Status Hero Card */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#3E2723]/10 shadow-xs">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#3E2723]/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#3E2723]">
                        #{activeOrder.orderId}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getStatusBadge(
                          activeOrder.status
                        )}`}
                      >
                        {activeOrder.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#3E2723]/60 mt-1">
                      Placed: {activeOrder.date} · Customer: {activeOrder.customerName}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-[#3E2723]/60 block">Expected Arrival</span>
                    <span className="text-xs font-bold text-emerald-800 flex items-center sm:justify-end gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {activeOrder.estimatedDelivery || activeOrder.deliveryTimeSlot}
                    </span>
                  </div>
                </div>

                {/* 4-Step Visual Progress Stepper */}
                <div className="pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C89D47] mb-6">
                    Live Confectionery &amp; Delivery Progress
                  </h4>

                  <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#3E2723]/15">
                    {activeOrder.steps.map((step, idx) => {
                      const isComplete = step.completed;
                      const isCurr = step.current;

                      return (
                        <div key={idx} className="relative group">
                          {/* Stepper icon bubble */}
                          <div
                            className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center bg-white border-2 shadow-xs ${
                              isComplete
                                ? 'border-emerald-600 text-emerald-600'
                                : isCurr
                                ? 'border-[#3E2723] text-[#3E2723] ring-4 ring-[#C89D47]/20'
                                : 'border-stone-300 text-stone-400'
                            }`}
                          >
                            {getStatusIcon(step.status, isComplete, isCurr)}
                          </div>

                          {/* Step Content */}
                          <div>
                            <div className="flex flex-wrap items-center justify-between gap-1">
                              <h5
                                className={`text-xs sm:text-sm font-bold ${
                                  isCurr
                                    ? 'text-[#3E2723]'
                                    : isComplete
                                    ? 'text-stone-800'
                                    : 'text-stone-400'
                                }`}
                              >
                                {step.label}
                              </h5>
                              {step.timestamp && (
                                <span
                                  className={`text-[11px] font-mono tabular-nums ${
                                    isCurr ? 'text-[#C89D47] font-semibold' : 'text-stone-500'
                                  }`}
                                >
                                  {step.timestamp}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#3E2723]/70 mt-0.5 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Order Items & Destination Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Destination */}
                <div className="bg-white p-4 rounded-xl border border-[#3E2723]/10 text-xs space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#C89D47] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Delivery Location</span>
                  </h4>
                  <p className="font-semibold text-[#3E2723]">{activeOrder.deliveryArea}</p>
                  <p className="text-[11px] text-[#3E2723]/70">
                    Slot: {activeOrder.deliveryTimeSlot} (10 AM–6 PM Window)
                  </p>
                  <p className="text-[11px] text-[#3E2723]/70">
                    Payment: <strong className="text-[#3E2723]">{activeOrder.paymentMethod}</strong>
                  </p>
                </div>

                {/* Items Summary */}
                <div className="bg-white p-4 rounded-xl border border-[#3E2723]/10 text-xs space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#C89D47] flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" />
                    <span>Chocolates in this Order</span>
                  </h4>
                  <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                    {activeOrder.items.map((it, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px]">
                        <span className="truncate pr-2">
                          {it.name} ({it.variant}) × {it.quantity}
                        </span>
                        <span className="font-bold tabular-nums shrink-0">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-[#3E2723]/10 flex justify-between font-bold text-xs">
                    <span>Order Total:</span>
                    <span className="font-serif text-sm text-[#3E2723] tabular-nums">
                      ₹{activeOrder.totalAmount}
                    </span>
                  </div>
                </div>

              </div>

              {/* Direct Help / WhatsApp Contact */}
              <div className="p-4 rounded-xl bg-[#EFE8DC] border border-[#3E2723]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-[#3E2723] flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#C89D47]" />
                    <span>Need specific timing changes or rider contact?</span>
                  </p>
                  <p className="text-[11px] text-[#3E2723]/70 mt-0.5">
                    Mandeep Singh personally coordinates dispatch across Aligarh.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Inquiry</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#3E2723]/10 flex items-center justify-between text-xs text-[#3E2723]/60 shrink-0">
          <span>Graceful Bitess Dispatch · Aligarh, UP</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#3E2723] hover:bg-[#2c1b18] text-white rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
