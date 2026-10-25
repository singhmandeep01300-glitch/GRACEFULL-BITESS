import React from 'react';
import { X, ShieldAlert, Truck, RefreshCw, FileText } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'shipping' | 'returns' | 'allergen' | null;

interface PolicyModalsProps {
  activePolicy: PolicyType;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalsProps> = ({ activePolicy, onClose }) => {
  if (!activePolicy) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F5F0E6] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#C89D47]/30 text-[#3E2723] relative max-h-[85vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#3E2723]/60 hover:text-[#3E2723] rounded-full hover:bg-black/5"
          aria-label="Close policy modal"
        >
          <X className="w-5 h-5" />
        </button>

        {activePolicy === 'privacy' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#C89D47]">
              <FileText className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">Privacy Policy</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3E2723] mb-4">
              Privacy &amp; Data Security
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-[#3E2723]/80">
              <p>
                At <strong>Graceful Bitess</strong> (owned and operated by Mandeep Singh in Aligarh, Uttar Pradesh), your privacy is of the utmost importance.
              </p>
              <h4 className="font-bold text-[#3E2723] text-sm pt-2">1. Information We Collect</h4>
              <p>
                We only collect basic order details (your name, contact number, delivery address in Aligarh, and optional gifting instructions) necessary to handcraft, package, and deliver your chocolate order.
              </p>
              <h4 className="font-bold text-[#3E2723] text-sm pt-2">2. Communication via WhatsApp</h4>
              <p>
                When you choose to order or communicate via WhatsApp (+91 9119076000), conversations remain private and are solely used for order dispatch, time slot confirmation, and customer service.
              </p>
              <h4 className="font-bold text-[#3E2723] text-sm pt-2">3. Third-Party Sharing</h4>
              <p>
                We never sell, rent, or trade your contact information with any external marketing agencies.
              </p>
            </div>
          </div>
        )}

        {activePolicy === 'terms' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#C89D47]">
              <FileText className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">Terms &amp; Conditions</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3E2723] mb-4">
              Terms of Service
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-[#3E2723]/80">
              <p>
                Welcome to Graceful Bitess. By browsing our website or placing an order through WhatsApp or our digital storefront, you agree to the following terms:
              </p>
              <h4 className="font-bold text-[#3E2723] text-sm pt-2">1. Small Batch Craftsmanship</h4>
              <p>
                All chocolates, truffles, and festive bonbons are prepared in artisanal batches. Product dimensions and subtle aesthetic finishes may vary gracefully from photographs, reflecting their handcrafted nature.
              </p>
              <h4 className="font-bold text-[#3E2723] text-sm pt-2">2. Pricing &amp; Availability</h4>
              <p>
                All prices are stated in Indian Rupees (₹). While we endeavor to maintain updated inventory, orders are subject to fresh batch availability and dispatch confirmation.
              </p>
              <h4 className="font-bold text-[#3E2723] text-sm pt-2">3. WhatsApp Order Confirmation</h4>
              <p>
                Placing an inquiry or opening WhatsApp does not automatically confirm an order until mutually confirmed by our team with an agreed delivery slot.
              </p>
            </div>
          </div>
        )}

        {activePolicy === 'shipping' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#C89D47]">
              <Truck className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">Delivery Policy</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3E2723] mb-4">
              Shipping &amp; Delivery in Aligarh
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-[#3E2723]/80">
              <h4 className="font-bold text-[#3E2723] text-sm">Operating Timings</h4>
              <p>
                Our delivery partner operates daily between <strong>10:00 AM and 6:00 PM</strong> across Aligarh, Uttar Pradesh.
              </p>
              <h4 className="font-bold text-[#3E2723] text-sm pt-2">Delivery Charges</h4>
              <p>
                - <strong>FREE Doorstep Delivery</strong> on orders of ₹999 or more.<br />
                - Flat local delivery charge of <strong>₹49</strong> for orders below ₹999.
              </p>
              <h4 className="font-bold text-[#3E2723] text-sm pt-2">Temperature-Protected Transport</h4>
              <p>
                To preserve delicate cocoa butter crystals and prevent melting during warmer seasons, all chocolate orders are transported in temperature-insulating bags.
              </p>
            </div>
          </div>
        )}

        {activePolicy === 'returns' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#C89D47]">
              <RefreshCw className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">Refund Policy</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3E2723] mb-4">
              Returns &amp; Replacement Policy
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-[#3E2723]/80">
              <p>
                Because chocolates and truffles are perishable culinary goods, we cannot accept returns once delivered and opened.
              </p>
              <h4 className="font-bold text-[#3E2723] text-sm pt-2">Transit Damage or Issues</h4>
              <p>
                If your chocolate hamper arrives damaged or compromised, please notify us within <strong>2 hours of delivery</strong> via WhatsApp (+91 9119076000) with a photo. We will immediately arrange a fresh replacement or suitable resolution.
              </p>
            </div>
          </div>
        )}

        {activePolicy === 'allergen' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#C89D47]">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-700">Food Safety</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3E2723] mb-4">
              Allergen &amp; Food Information
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-[#3E2723]/80">
              <p>
                At Graceful Bitess, transparency regarding our culinary ingredients is essential to consumer well-being.
              </p>
              <h4 className="font-bold text-[#3E2723] text-sm pt-2">Common Allergens Handled</h4>
              <p>
                Our confectionery kitchen processes:
                <br />• <strong>Dairy:</strong> Whole milk powder, butter, and heavy dairy cream.
                <br />• <strong>Tree Nuts:</strong> Almonds, hazelnuts, pistachios, cashews.
                <br />• <strong>Soy:</strong> Minimal soy lecithin used as natural emulsion in select cocoa coatings.
              </p>
              <h4 className="font-bold text-[#3E2723] text-sm pt-2">Storage Best Practices</h4>
              <p>
                Store your chocolates at <strong>15°C–18°C</strong> in a cool, dark, dry place away from heat sources and strong aromatic spices. Consume truffles within 45 days and dark bars within 90 days.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#3E2723]/10 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#3E2723] text-white text-xs font-semibold rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
