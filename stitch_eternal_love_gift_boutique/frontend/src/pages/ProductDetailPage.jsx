import React, { useState } from 'react';
import ProductGallery from '../components/ProductGallery';
import PersonalizationSection from '../components/PersonalizationSection';
import Accordion from '../components/Accordion';
import CrossSellSection from '../components/CrossSellSection';
import { productDetailData } from '../data/mockData';

export default function ProductDetailPage({
  onAddToCart,
  onToggleFavorite,
  wishlistIds = [],
  onNavigate
}) {
  const [mug1Name, setMug1Name] = useState('Hers');
  const [mug2Name, setMug2Name] = useState('His');
  const [estDate, setEstDate] = useState('2024-02-14');
  const [fontStyle, setFontStyle] = useState('elegant');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorite = wishlistIds.includes(productDetailData.id);

  const handleAddCustomMugs = () => {
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);

    onAddToCart({
      ...productDetailData,
      customization: {
        mug1Name: mug1Name || 'Hers',
        mug2Name: mug2Name || 'His',
        estDate,
        fontStyle
      }
    });
  };

  const accordionItems = [
    {
      title: 'Description',
      content: productDetailData.description
    },
    {
      title: 'Material & Care',
      content: productDetailData.materials
    },
    {
      title: 'Shipping Info',
      content: productDetailData.shipping
    }
  ];

  return (
    <div className="pt-4 pb-20 md:pb-24 px-4 md:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb / Category indicator */}
      <div className="flex items-center space-x-2 text-xs font-sans text-[#584141] mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#570013] transition-colors"
        >
          Amore &amp; Co. Boutique
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#570013] transition-colors"
        >
          Made for Two
        </button>
        <span>/</span>
        <span className="text-[#570013] font-semibold">Morning Love Mugs</span>
      </div>

      {/* Main Grid: Gallery & Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14">
        {/* Left Column: Gallery */}
        <div className="md:col-span-7">
          <ProductGallery images={productDetailData.images} />
        </div>

        {/* Right Column: Product Details & Personalization */}
        <div className="md:col-span-5 flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="inline-block px-3 py-1 bg-[#eae8e0] rounded-full font-sans text-[11px] font-bold text-[#570013] tracking-widest uppercase">
                {productDetailData.badge}
              </span>
              <span className="inline-block px-3 py-1 bg-[#FDF2F2] rounded-full font-sans text-[11px] font-bold text-[#735c00] tracking-widest uppercase">
                Hand-Glazed
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1b1c17] font-bold mb-2">
              {productDetailData.title}
            </h1>

            <div className="flex items-center justify-between mb-4">
              <p className="font-serif text-2xl text-[#570013] font-bold">
                {productDetailData.formattedPrice}
              </p>

              {/* Rating stars */}
              <div className="flex items-center text-[#e9c349]">
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star_half
                </span>
                <span className="ml-2 font-sans text-xs text-[#584141] font-semibold">
                  ({productDetailData.reviewCount})
                </span>
              </div>
            </div>

            <div className="signature-divider my-4" />
          </div>

          {/* Personalization Interactive Engine */}
          <PersonalizationSection
            mug1Name={mug1Name}
            setMug1Name={setMug1Name}
            mug2Name={mug2Name}
            setMug2Name={setMug2Name}
            estDate={estDate}
            setEstDate={setEstDate}
            fontStyle={fontStyle}
            setFontStyle={setFontStyle}
          />

          {/* Primary Action Buttons */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              type="button"
              onClick={handleAddCustomMugs}
              className={`flex-1 font-sans text-sm uppercase tracking-widest font-bold py-4 px-6 rounded-full shadow-lg transition-all duration-300 flex justify-center items-center relative overflow-hidden group ${
                addedAnimation
                  ? 'bg-[#735c00] text-white shadow-xl scale-[1.02]'
                  : 'bg-[#570013] text-white hover:bg-[#800020] hover:shadow-[0_6px_25px_rgba(87,0,19,0.4)] hover:-translate-y-0.5'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {addedAnimation ? (
                  <>
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Added to Gift Box!
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">card_giftcard</span>
                    Add to My Gift Box
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => onToggleFavorite(productDetailData)}
              aria-label="Save to Wishlist"
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${
                isFavorite
                  ? 'border-[#570013] bg-[#570013] text-white'
                  : 'border-[#e0bfbf] text-[#570013] hover:border-[#570013] hover:bg-[#FDF2F2]'
              }`}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-2 gap-3 mb-8 p-3.5 bg-[#FFFDF5] rounded-xl border border-[#e0bfbf]/50 text-xs text-[#584141] font-sans">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#D4AF37] text-base">local_shipping</span>
              <span>Free luxury boxed delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#D4AF37] text-base">verified</span>
              <span>Guaranteed keepsake quality</span>
            </div>
          </div>

          {/* Accordion Drawers */}
          <Accordion items={accordionItems} />
        </div>
      </div>

      {/* Cross-Sell Section: "Complete the Gift" */}
      <CrossSellSection
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
        wishlistIds={wishlistIds}
      />
    </div>
  );
}
