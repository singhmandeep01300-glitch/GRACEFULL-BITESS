import React from 'react';
import { Gift, HeartHandshake, MessageCircle, Truck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: Gift,
      title: 'Beautifully Presented Chocolates',
      description:
        'Every chocolate collection is packaged with meticulous care in our signature gift boxes, gold accents, and elegant satin ribbons ready for immediate gifting.',
      detail: 'Keepsake packaging & gift boxes',
    },
    {
      icon: HeartHandshake,
      title: 'Thoughtful Gifts for Every Occasion',
      description:
        'From heartfelt birthdays and anniversaries to Rakhi celebrations and festive milestones, we curate hampers that convey warmth and affection.',
      detail: 'Complimentary handwritten gift card',
    },
    {
      icon: MessageCircle,
      title: 'Easy WhatsApp Ordering',
      description:
        'Connect directly with our team on WhatsApp (+91 9119076000) for instant product advice, custom flavour requests, and personal order updates.',
      detail: 'Direct chat with founder Mandeep Singh',
    },
    {
      icon: Truck,
      title: 'Local Delivery in Aligarh',
      description:
        'We deliver fresh chocolate batches right to your doorstep anywhere in Aligarh daily between 10:00 AM and 6:00 PM in temperature-guarded packaging.',
      detail: '10:00 AM – 6:00 PM local slots',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#EFE8DC]/60 border-t border-[#3E2723]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#C89D47]">
            Craftsmanship &amp; Care
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723] mt-1.5 mb-3">
            Why Choose Graceful Bitess?
          </h2>
          <p className="text-sm text-[#3E2723]/75 leading-relaxed">
            We believe premium chocolate should be an experience of joy, from the first snap to the last melt.
          </p>
        </div>

        {/* 4 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white p-6 rounded-2xl border border-[#3E2723]/8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F5F0E6] text-[#3E2723] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-[#C89D47]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#3E2723] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#3E2723]/70 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#3E2723]/8">
                  <span className="text-[11px] font-semibold text-[#C89D47]">
                    {item.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
