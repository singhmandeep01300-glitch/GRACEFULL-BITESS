import React from 'react';
import { INSTAGRAM_POSTS } from '../data/products';
import { ImageWithFallback } from './ImageWithFallback';
import { Heart, Instagram } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#F5F0E6] border-t border-[#3E2723]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#7B61FF] mb-2">
            <Instagram className="w-4 h-4 text-[#7B61FF]" />
            <span>@gracefulbitess</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723] mb-2">
            Behind the Sweet Scenes
          </h2>
          <p className="text-xs sm:text-sm text-[#3E2723]/70">
            Follow our chocolate journey, fresh batch announcements, and seasonal hamper previews on Instagram.
          </p>
        </div>

        {/* 4-Post Visual Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-xl overflow-hidden bg-[#EFE8DC] border border-[#3E2723]/10 shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <ImageWithFallback
                src={post.imageUrl}
                alt={post.caption}
                aspectRatioClass="aspect-square"
              />

              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-[#3E2723]/80 backdrop-blur-xs p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white">
                <div className="flex items-center justify-between text-xs text-[#D7CCC8]">
                  <span className="flex items-center gap-1 font-semibold text-[#F5F0E6]">
                    <Heart className="w-3.5 h-3.5 fill-[#7B61FF] text-[#7B61FF]" />
                    {post.likes} likes
                  </span>
                  <Instagram className="w-4 h-4 text-[#7B61FF]" />
                </div>
                
                <p className="text-xs text-[#F5F0E6]/90 line-clamp-3 leading-snug">
                  {post.caption}
                </p>

                <div className="text-[10px] uppercase tracking-wider text-[#C89D47] font-semibold">
                  Aligarh, UP
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Follow Button */}
        <div className="mt-10 text-center">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7B61FF] to-[#3E2723] hover:opacity-90 transition-opacity shadow-sm hover:shadow-md"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @gracefulbitess on Instagram</span>
          </a>
          <p className="text-[11px] text-[#3E2723]/50 mt-2">
            Official social handles will be updated upon public verification.
          </p>
        </div>

      </div>
    </section>
  );
};
