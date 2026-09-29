import React from 'react';

export default function ProductCard({
  product,
  onSelect,
  isFavorite = false,
  onToggleFavorite
}) {
  return (
    <div
      onClick={() => onSelect(product)}
      className="bg-white rounded-2xl overflow-hidden premium-shadow group cursor-pointer relative border border-[#FDF2F2] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      {/* Best Seller or Custom Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 bg-[#FDF2F2] border border-[#e0bfbf] text-[#570013] font-sans font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-full uppercase shadow-xs">
          {product.badge}
        </div>
      )}

      {/* Favorite Heart Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(product);
        }}
        aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#570013] shadow-sm hover:scale-110 active:scale-95 transition-all opacity-90 group-hover:opacity-100"
      >
        <span
          className="material-symbols-outlined text-[20px] transition-colors"
          style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
        >
          {isFavorite ? 'favorite' : 'favorite_border'}
        </span>
      </button>

      {/* Image Container */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-[#f0eee6]">
        <img
          src={product.image}
          alt={product.alt || product.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick View Pill */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="bg-white/95 backdrop-blur-md text-[#570013] text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-sm">
            Personalize Now
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 text-center flex-grow flex flex-col justify-between bg-white">
        <div>
          <h4 className="font-serif text-base sm:text-lg text-[#1b1c17] group-hover:text-[#570013] transition-colors font-semibold mb-1">
            {product.title}
          </h4>
          <p className="font-sans text-xs text-[#584141] mb-2">Handcrafted luxury keepsake</p>
        </div>
        <p className="font-sans text-sm sm:text-base text-[#570013] font-bold">
          {product.formattedPrice}
        </p>
      </div>
    </div>
  );
}
