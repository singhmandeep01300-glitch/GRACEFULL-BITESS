import React, { useState } from 'react';
import { Mail, CheckCircle2, Copy, Check } from 'lucide-react';

interface NewsletterSectionProps {
  onApplyCoupon: (code: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onApplyCoupon }) => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !agreed) return;

    setIsSubscribed(true);
    onApplyCoupon('SWEETBITES');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('SWEETBITES');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#3E2723] text-[#F5F0E6] relative overflow-hidden">
      {/* Subtle gold glow behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C89D47]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#C89D47] mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Graceful Bitess Circle</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          A Little Sweetness in Your Inbox.
        </h2>

        <p className="text-xs sm:text-base text-[#D7CCC8] max-w-xl mx-auto mb-8 leading-relaxed">
          Be the first to hear about fresh seasonal truffle batches, exclusive festive hampers, and artisanal chocolate tasting notes in Aligarh.
        </p>

        {isSubscribed ? (
          <div className="bg-white/10 border border-[#C89D47]/40 rounded-2xl p-6 sm:p-8 max-w-lg mx-auto text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-[#C89D47]/20 text-[#C89D47] mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              Welcome to the Family!
            </h3>
            <p className="text-xs text-[#D7CCC8] mb-4">
              Here is your exclusive welcome gift: ₹50 OFF your next order! We have also auto-applied it to your bag.
            </p>
            
            <div className="inline-flex items-center gap-3 bg-[#F5F0E6] text-[#3E2723] px-4 py-2.5 rounded-xl font-mono text-sm font-bold border border-[#C89D47]">
              <span>SWEETBITES</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-xs text-[#C89D47] hover:text-[#3E2723] transition-colors p-1 flex items-center gap-1"
                title="Copy Coupon"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span className="font-sans text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-[#F5F0E6] placeholder-white/40 text-xs sm:text-sm focus:outline-hidden focus:border-[#C89D47] backdrop-blur-xs"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C89D47] hover:bg-[#b58c3a] text-[#3E2723] text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </div>

            <label className="flex items-start gap-2 text-left text-[11px] text-[#D7CCC8]/80 cursor-pointer justify-center">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="mt-0.5 rounded text-[#C89D47] focus:ring-0"
              />
              <span>
                I agree to receive occasional sweet updates &amp; festive offers. Unsubscribe at any time.
              </span>
            </label>
          </form>
        )}

      </div>
    </section>
  );
};
