import React from 'react';
import { crossSellProducts } from '../data/mockData';

export default function CrossSellSection({ onAddToCart, onToggleFavorite, wishlistIds = [] }) {
  return (
    <section className="mt-16 md:mt-24 pt-12 border-t border-[#e0bfbf]">
      <div className="text-center mb-10">
        <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-[#735c00]">
          Curated Pairings
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-[#570013] font-bold mt-1">
          Complete the Gift
        </h3>
        <p className="text-xs sm:text-sm text-[#584141] mt-1">
          Thoughtful accompaniments to make the unboxing moment even more magical.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {crossSellProducts.map((item) => {
          const isFavorited = wishlistIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3 border border-[#FDF2F2] premium-shadow elevation-hover group flex flex-col justify-between"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f0eee6] mb-3">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => onToggleFavorite(item)}
                  aria-label="Save item"
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#570013] opacity-90 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all shadow-xs"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {isFavorited ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
              </div>

              <div className="text-center px-2 pb-2">
                <h4 className="font-serif text-base text-[#1b1c17] group-hover:text-[#570013] transition-colors font-semibold mb-1">
                  {item.title}
                </h4>
                <p className="font-sans text-sm text-[#570013] font-bold mb-3">
                  ${item.price.toFixed(2)}
                </p>
                <button
                  type="button"
                  onClick={() => onAddToCart(item)}
                  className="w-full py-2 px-3 rounded-full border border-[#570013] text-[#570013] text-[11px] font-sans font-bold uppercase tracking-wider hover:bg-[#570013] hover:text-white transition-all active:scale-95"
                >
                  + Add to Gift Box
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
