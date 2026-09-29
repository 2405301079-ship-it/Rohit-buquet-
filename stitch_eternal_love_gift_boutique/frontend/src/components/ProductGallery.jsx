import React, { useState } from 'react';

export default function ProductGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images.length) return null;

  return (
    <div className="space-y-4">
      {/* Main Carousel Display */}
      <div className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-[#f0eee6] custom-shadow group">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 relative">
              <img
                src={img.full}
                alt={img.alt}
                className="w-full h-full object-cover select-none"
              />
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevImage}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-[#570013] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110 shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        <button
          onClick={nextImage}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-[#570013] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110 shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>

        {/* Carousel Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-full">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'bg-[#D4AF37] w-6'
                  : 'bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Bar */}
      <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2 pt-1">
        {images.map((img, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Thumbnail ${idx + 1}`}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 focus:outline-none ${
                isActive
                  ? 'border-[#570013] ring-2 ring-[#D4AF37]/50 shadow-sm scale-102'
                  : 'border-transparent hover:border-[#e0bfbf] opacity-75 hover:opacity-100'
              }`}
            >
              <img
                src={img.thumb || img.full}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
