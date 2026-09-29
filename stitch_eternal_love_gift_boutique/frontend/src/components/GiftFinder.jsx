import React, { useState } from 'react';
import { getConciergeRecommendation } from '../services/api';

export default function GiftFinder({ onFindGift }) {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipient || !occasion) {
      setRecommendation({
        title: 'Morning Love Mugs',
        note: 'Our #1 couple gift recommended for every celebration!',
        id: 'morning-love-mugs'
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await getConciergeRecommendation(recipient, occasion);
      const recItem = data.recommendation || { title: 'Morning Love Mugs', id: 'morning-love-mugs' };
      setRecommendation({
        title: recItem.title,
        note: data.conciergeNote || `Perfect for your ${recipient} on this special ${occasion}!`,
        id: recItem.id || 'morning-love-mugs'
      });
    } catch {
      setRecommendation({
        title: 'Morning Love Mugs',
        note: `Perfect for your ${recipient} on this special ${occasion}!`,
        id: 'morning-love-mugs'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 px-4 md:px-12 max-w-3xl mx-auto">
      <div className="bg-white rounded-[2rem] p-8 md:p-12 premium-shadow border border-[#FDF2F2] text-center relative overflow-hidden">
        {/* Soft Background Accent */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#FDF2F2] rounded-full blur-2xl pointer-events-none" />

        <div className="w-12 h-12 mx-auto rounded-full bg-[#FDF2F2] text-[#570013] flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-2xl">card_giftcard</span>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl text-[#570013] font-bold mb-2">
          Find the Perfect Gift
        </h3>
        <p className="font-sans text-sm md:text-base text-[#584141] mb-8 max-w-md mx-auto">
          Let our boutique concierge curate the ideal heartfelt moment for you and your loved one.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto text-left">
          <div className="relative">
            <label className="block text-[11px] font-sans font-semibold tracking-wider text-[#735c00] uppercase mb-1">
              Recipient
            </label>
            <div className="relative">
              <select
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                  setRecommendation(null);
                }}
                className="w-full appearance-none bg-white border border-[#e0bfbf] text-[#1b1c17] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] font-sans text-sm shadow-xs transition-all"
              >
                <option value="">Who are you shopping for?</option>
                <option value="girlfriend">Girlfriend</option>
                <option value="boyfriend">Boyfriend</option>
                <option value="wife">Wife</option>
                <option value="husband">Husband</option>
                <option value="soulmate">Soulmate</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#584141] pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          <div className="relative">
            <label className="block text-[11px] font-sans font-semibold tracking-wider text-[#735c00] uppercase mb-1">
              Celebration
            </label>
            <div className="relative">
              <select
                value={occasion}
                onChange={(e) => {
                  setOccasion(e.target.value);
                  setRecommendation(null);
                }}
                className="w-full appearance-none bg-white border border-[#e0bfbf] text-[#1b1c17] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] font-sans text-sm shadow-xs transition-all"
              >
                <option value="">What's the occasion?</option>
                <option value="anniversary">Anniversary</option>
                <option value="birthday">Birthday</option>
                <option value="valentines">Valentine's Day</option>
                <option value="proposal">Proposal / Engagement</option>
                <option value="just-because">Just Because I Love You</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#584141] pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-[#570013] text-white font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 btn-hover-glow shadow-md hover:bg-[#800020] mt-2"
          >
            FIND MY PERFECT GIFT
          </button>
        </form>

        {/* Dynamic Recommendation Result */}
        {recommendation && (
          <div className="mt-8 p-6 bg-[#FFFDF5] border border-[#D4AF37]/50 rounded-2xl animate-fadeIn max-w-md mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-[#FDF2F2] text-[#570013] text-[10px] font-bold rounded-full uppercase tracking-widest mb-2">
              Concierge Match Found
            </div>
            <h4 className="font-serif text-xl font-bold text-[#570013]">
              {recommendation.title}
            </h4>
            <p className="font-sans text-xs text-[#584141] mt-1 mb-4">
              {recommendation.note}
            </p>
            <button
              onClick={() => onFindGift && onFindGift(recommendation.id)}
              className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#570013] font-sans text-xs uppercase tracking-wider font-bold hover:bg-[#fed65b] transition-all shadow-sm"
            >
              Customize This Gift →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
