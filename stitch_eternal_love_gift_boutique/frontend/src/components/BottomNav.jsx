import React from 'react';

export default function BottomNav({
  currentPage,
  onNavigate,
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist
}) {
  return (
    <nav
      className="fixed bottom-0 w-full z-50 bg-[#FFFDF5]/95 backdrop-blur-md shadow-[0_-4px_16px_rgba(0,0,0,0.06)] border-t border-[#e0bfbf]/50 h-16 flex justify-around items-center md:hidden"
      id="bottom-nav"
    >
      {/* Boutique Home */}
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center w-16 transition-all duration-200 active:scale-95 ${
          currentPage === 'home'
            ? 'text-[#570013] font-bold'
            : 'text-[#584141] hover:text-[#570013]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px] mb-0.5"
          style={{ fontVariationSettings: currentPage === 'home' ? "'FILL' 1" : "'FILL' 0" }}
        >
          storefront
        </span>
        <span className="font-sans text-[10px] tracking-wider uppercase font-semibold">
          Shop
        </span>
      </button>

      {/* Product Detail / Gifts */}
      <button
        onClick={() => onNavigate('product-detail')}
        className={`flex flex-col items-center justify-center w-16 transition-all duration-200 active:scale-95 ${
          currentPage === 'product-detail'
            ? 'text-[#570013] font-bold'
            : 'text-[#584141] hover:text-[#570013]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px] mb-0.5"
          style={{ fontVariationSettings: currentPage === 'product-detail' ? "'FILL' 1" : "'FILL' 0" }}
        >
          card_giftcard
        </span>
        <span className="font-sans text-[10px] tracking-wider uppercase font-semibold">
          Personalize
        </span>
      </button>

      {/* Wishlist */}
      <button
        onClick={onOpenWishlist || onOpenCart}
        className="flex flex-col items-center justify-center w-16 text-[#584141] hover:text-[#570013] transition-all duration-200 active:scale-95 relative"
      >
        <span className="material-symbols-outlined text-[22px] mb-0.5">favorite</span>
        <span className="font-sans text-[10px] tracking-wider uppercase font-semibold">
          Saved
        </span>
        {wishlistCount > 0 && (
          <span className="absolute top-1 right-3 w-3.5 h-3.5 bg-[#570013] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* Cart */}
      <button
        onClick={onOpenCart}
        className="flex flex-col items-center justify-center w-16 text-[#584141] hover:text-[#570013] transition-all duration-200 active:scale-95 relative"
      >
        <span className="material-symbols-outlined text-[22px] mb-0.5">shopping_bag</span>
        <span className="font-sans text-[10px] tracking-wider uppercase font-semibold">
          Box
        </span>
        {cartCount > 0 && (
          <span className="absolute top-1 right-3 w-3.5 h-3.5 bg-[#D4AF37] text-[#570013] text-[9px] font-bold rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}
