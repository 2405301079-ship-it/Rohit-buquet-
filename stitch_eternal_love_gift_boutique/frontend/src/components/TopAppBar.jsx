import React, { useState } from 'react';

export default function TopAppBar({
  currentPage,
  onNavigate,
  cartCount = 0,
  wishlistCount = 0,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fbf9f1]/90 backdrop-blur-md shadow-sm border-b border-[#e0bfbf]/40 transition-all duration-300" id="top-nav">
      <div className="flex justify-between items-center px-4 md:px-12 h-16 md:h-20 w-full max-w-7xl mx-auto">
        {/* Left Actions: Back or Menu */}
        <div className="flex items-center space-x-2">
          {currentPage === 'product-detail' ? (
            <button
              onClick={() => onNavigate('home')}
              aria-label="Back to boutique"
              className="p-2 text-[#584141] hover:text-[#570013] transition-colors rounded-full hover:bg-[#FDF2F2] flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              <span className="hidden sm:inline font-sans text-xs uppercase tracking-wider font-semibold">Boutique</span>
            </button>
          ) : (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              className="p-2 text-[#584141] hover:text-[#735c00] transition-colors duration-300 active:scale-95 rounded-full hover:bg-[#FDF2F2]"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          )}

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center space-x-6 ml-4">
            <button
              onClick={() => onNavigate('home')}
              className={`font-sans text-xs uppercase tracking-widest font-semibold pb-1 transition-all ${
                currentPage === 'home'
                  ? 'text-[#570013] border-b-2 border-[#570013]'
                  : 'text-[#584141] hover:text-[#570013]'
              }`}
            >
              Collection
            </button>
            <button
              onClick={() => onNavigate('product-detail')}
              className={`font-sans text-xs uppercase tracking-widest font-semibold pb-1 transition-all ${
                currentPage === 'product-detail'
                  ? 'text-[#570013] border-b-2 border-[#570013]'
                  : 'text-[#584141] hover:text-[#570013]'
              }`}
            >
              Personalize Mugs
            </button>
          </nav>
        </div>

        {/* Center Brand Title */}
        <div className="cursor-pointer text-center" onClick={() => onNavigate('home')}>
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#570013] italic hover:opacity-90 transition-opacity">
            Amore &amp; Co.
          </h1>
          <p className="hidden md:block text-[9px] uppercase tracking-[0.25em] text-[#735c00] font-sans -mt-1 font-medium">
            Sophisticated Romance
          </p>
        </div>

        {/* Right Actions: Search, Wishlist & Cart */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="p-2 text-[#584141] hover:text-[#735c00] transition-colors duration-300 active:scale-95 rounded-full hover:bg-[#FDF2F2]"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            onClick={onOpenWishlist || onOpenCart}
            aria-label="Wishlist"
            className="p-2 text-[#584141] hover:text-[#570013] transition-colors duration-300 active:scale-95 rounded-full hover:bg-[#FDF2F2] relative hidden sm:block"
          >
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#570013] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Cart"
            className="p-2 text-[#584141] hover:text-[#570013] transition-colors duration-300 active:scale-95 rounded-full hover:bg-[#FDF2F2] relative"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4AF37] text-[#570013] text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF5] border-b border-[#e0bfbf] px-6 py-4 space-y-3 shadow-lg animate-fadeIn">
          <div className="flex justify-between items-center pb-2 border-b border-[#FDF2F2]">
            <span className="font-serif italic text-lg text-[#570013]">Navigation</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#584141] p-1"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-sans font-medium text-[#570013] hover:text-[#D4AF37] flex items-center justify-between"
          >
            <span>Boutique Gift Shop (Home)</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
          <button
            onClick={() => {
              onNavigate('product-detail');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-sans font-medium text-[#570013] hover:text-[#D4AF37] flex items-center justify-between"
          >
            <span>Personalize Morning Love Mugs</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
          <div className="pt-2 text-xs text-[#584141] flex items-center gap-2">
            <span className="text-[#D4AF37]">♥</span> Complimentary boutique luxury gift box on all orders
          </div>
        </div>
      )}
    </header>
  );
}
