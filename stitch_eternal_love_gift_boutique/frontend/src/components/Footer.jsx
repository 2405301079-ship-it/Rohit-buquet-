import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full pt-16 pb-24 md:pb-16 border-t border-[#e0bfbf] bg-[#f0eee6]/60 flex flex-col items-center justify-center text-center px-4">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#570013] mb-2 italic">
        Amore &amp; Co.
      </h2>
      <p className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#735c00] mb-6">
        Sophisticated Romance &amp; Keepsakes
      </p>

      {/* Boutique Links */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8 text-xs sm:text-sm font-sans text-[#584141]">
        <a href="#shipping" className="hover:text-[#570013] transition-colors">
          Shipping &amp; Delivery
        </a>
        <a href="#returns" className="hover:text-[#570013] transition-colors">
          Boutique Returns
        </a>
        <a href="#privacy" className="hover:text-[#570013] transition-colors">
          Privacy Policy
        </a>
        <a href="#boutiques" className="hover:text-[#570013] transition-colors">
          Boutique Finder
        </a>
        <a href="#bespoke" className="hover:text-[#570013] transition-colors">
          Bespoke Orders
        </a>
      </div>

      <div className="flex items-center gap-2 text-xs font-sans text-[#570013]">
        <span>Handcrafted with devotion</span>
        <span className="text-[#D4AF37]">♥</span>
        <span>© {new Date().getFullYear()} Amore &amp; Co. All rights reserved.</span>
      </div>
    </footer>
  );
}
