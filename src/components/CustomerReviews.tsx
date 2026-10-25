import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ThumbsUp } from 'lucide-react';
import { ReviewItem } from '../types';

interface CustomerReviewsProps {
  reviews: ReviewItem[];
  onAddReview: (review: Omit<ReviewItem, 'id' | 'date' | 'verifiedPurchase'>) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews, onAddReview }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('Aligarh');
  const [productName, setProductName] = useState('Chocolate Truffle Box');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) return;

    onAddReview({
      customerName: customerName.trim(),
      city: city.trim(),
      productName,
      rating,
      comment: comment.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setCustomerName('');
      setComment('');
    }, 1500);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#EFE8DC]/50 border-t border-[#3E2723]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#C89D47]">
              Customer Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723] mt-1">
              Words From Chocolate Lovers
            </h2>
            <p className="text-xs text-[#3E2723]/60 mt-1">
              Genuine customer impressions and local feedback from Aligarh patrons.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#F5F0E6] text-[#3E2723] border border-[#3E2723]/15 text-xs font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#C89D47]" />
            <span>Share Your Feedback</span>
          </button>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-[#3E2723]/8 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'fill-[#C89D47] text-[#C89D47]'
                          : 'text-[#3E2723]/20'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-[#3E2723] ml-1.5">
                    {rev.rating}.0
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-[#3E2723]/80 italic leading-relaxed mb-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author & Product metadata */}
              <div className="pt-4 border-t border-[#3E2723]/8 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#3E2723] leading-snug">
                    {rev.customerName}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#3E2723]/60">
                    <span>{rev.city}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rev.date}</span>
                  </div>
                </div>

                {rev.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Honest Invitation Note */}
        <div className="mt-10 p-5 rounded-xl bg-white/70 border border-[#3E2723]/10 text-center max-w-xl mx-auto text-xs text-[#3E2723]/75">
          <p className="font-semibold text-[#3E2723] mb-1">
            Have you tasted Graceful Bitess confections?
          </p>
          <p>
            As a local artisanal startup in Aligarh, every review helps us refine our craft. We warmly invite your feedback!
          </p>
        </div>

      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#F5F0E6] rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#C89D47]/30 text-[#3E2723] relative">
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-2xl font-bold text-[#3E2723]">
                Share Your Experience
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-xs text-[#3E2723]/60 hover:text-[#3E2723] p-1 font-bold"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <ThumbsUp className="w-6 h-6" />
                </div>
                <p className="font-serif text-xl font-bold text-[#3E2723]">Thank you so much!</p>
                <p className="text-xs text-[#3E2723]/70">Your review has been shared with Mandeep and our confectionery team.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium mb-1 text-[#3E2723]">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohini Gupta"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#3E2723]/20 text-[#3E2723] focus:outline-hidden focus:border-[#C89D47]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1 text-[#3E2723]">Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Civil Lines, Aligarh"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#3E2723]/20 text-[#3E2723] focus:outline-hidden focus:border-[#C89D47]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1 text-[#3E2723]">Rating (Stars)</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#3E2723]/20 text-[#3E2723] focus:outline-hidden focus:border-[#C89D47]"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                      <option value={3}>⭐⭐⭐ (3 - Average)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-[#3E2723]">Chocolate Tasted</label>
                  <input
                    type="text"
                    placeholder="e.g. Chocolate Truffle Box or Classic Milk"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#3E2723]/20 text-[#3E2723] focus:outline-hidden focus:border-[#C89D47]"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-[#3E2723]">Your Review / Feedback *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="How was the taste, texture, packaging, or delivery in Aligarh?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#3E2723]/20 text-[#3E2723] focus:outline-hidden focus:border-[#C89D47] resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#3E2723]/70 hover:text-[#3E2723]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#3E2723] hover:bg-[#2c1b18] text-[#F5F0E6] text-xs font-semibold rounded-xl shadow-xs"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
