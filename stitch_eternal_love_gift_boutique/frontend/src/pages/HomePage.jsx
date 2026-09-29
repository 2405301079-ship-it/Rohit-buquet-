import React from 'react';
import HeroSection from '../components/HeroSection';
import RelationshipSection from '../components/RelationshipSection';
import OccasionGrid from '../components/OccasionGrid';
import ProductCard from '../components/ProductCard';
import GiftFinder from '../components/GiftFinder';
import { featuredProducts } from '../data/mockData';

export default function HomePage({
  onNavigate,
  onSelectProduct,
  onToggleFavorite,
  wishlistIds = []
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection
        onExplorePersonalized={() => onNavigate('product-detail')}
        onShopCoupleGifts={() => {
          const el = document.getElementById('made-for-two');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Shop by Relationship */}
      <RelationshipSection
        onSelectRelationship={(rel) => {
          // Navigate to personalized product when selecting category
          onNavigate('product-detail');
        }}
      />

      {/* Signature Divider with Gold Heart */}
      <div className="max-w-4xl mx-auto w-full px-8">
        <div className="signature-divider" />
      </div>

      {/* 3. Shop by Occasion Grid */}
      <OccasionGrid
        onSelectOccasion={(occ) => {
          onNavigate('product-detail');
        }}
      />

      {/* 4. "Made for Two" Product Cards */}
      <section id="made-for-two" className="py-16 md:py-20 px-4 md:px-12 bg-[#FDF2F2]/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-[#735c00]">
              Handcrafted For Couples
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#570013] font-bold mt-1">
              Made for Two
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#584141] mt-2 max-w-md mx-auto">
              Each piece is individually finished with custom gold leaf accents and personal engraved details.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {featuredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isFavorite={wishlistIds.includes(prod.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={() => {
                  onSelectProduct(prod);
                  onNavigate('product-detail');
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Romantic Gift Finder */}
      <GiftFinder
        onFindGift={(giftId) => {
          onNavigate('product-detail');
        }}
      />
    </div>
  );
}
