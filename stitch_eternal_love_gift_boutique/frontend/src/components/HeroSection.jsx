import React from 'react';

export default function HeroSection({ onExplorePersonalized, onShopCoupleGifts }) {
  return (
    <section className="relative w-full h-[640px] md:h-[720px] flex items-end pb-16 px-4 md:px-8 bg-[#FFFDF5]">
      {/* Background Image Container with Soft Rounded Bottom */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem]">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBpAZLmaxl0kWM4lbkQS_Ri8gopUrXpjEiXvNV6wOCb0_hznVi3UL7FG9gZEw63xVwPpNQPAug2b5sre7Htj5jAKtajSRfdtBX-WwFu9gEqXPlNM4ReB_gbUv_9jSym3hgh_NkmS3uj9WZgKu_HgejR3mxe_WjtyX_F_K6EAorCO1h1sNxntmcyvULHHURTbqVbgD4L3LKo4_fJ1xsrNoaCrKLLjG42wfpMM7rBDjwS_ZVE4rMGd-YLlg')`
          }}
          aria-label="Lifestyle couple exchanging romantic gifts"
        />
        {/* Soft Tonal Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF5] via-[#FFFDF5]/50 to-transparent" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center flex flex-col items-center">
        <span className="inline-block px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-[#e0bfbf] rounded-full text-[11px] font-sans font-semibold tracking-widest text-[#570013] uppercase mb-4 shadow-sm">
          Amore &amp; Co. Signature Collection
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#570013] font-bold leading-tight mb-4 tracking-tight">
          Gifts That Say What Words Can't <span className="text-[#D4AF37] inline-block animate-pulse">♥</span>
        </h2>

        <p className="font-sans text-base md:text-lg text-[#584141] mb-8 max-w-lg mx-auto leading-relaxed">
          Make every moment unforgettable with thoughtful, hand-curated gifts designed for couples and the people you cherish most.
        </p>

        <div className="flex flex-col sm:flex-row w-full gap-4 max-w-md mx-auto justify-center">
          <button
            onClick={onShopCoupleGifts}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#570013] text-white font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 btn-hover-glow shadow-md hover:bg-[#800020]"
          >
            SHOP COUPLE GIFTS
          </button>
          <button
            onClick={onExplorePersonalized}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#570013] text-[#570013] bg-white/70 backdrop-blur-sm font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 hover:bg-[#FDF2F2] hover:border-[#D4AF37]"
          >
            EXPLORE PERSONALIZED
          </button>
        </div>
      </div>
    </section>
  );
}
