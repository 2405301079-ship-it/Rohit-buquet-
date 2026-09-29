import React, { useState } from 'react';
import { occasions } from '../data/mockData';

export default function OccasionGrid({ onSelectOccasion }) {
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  const handleClick = (occ) => {
    setSelectedOccasion(occ.id);
    if (onSelectOccasion) {
      onSelectOccasion(occ);
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-12 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-[#735c00]">
          Memorable Milestones
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-[#570013] mt-1">
          Shop by Occasion
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {occasions.map((occ) => {
          const isSelected = selectedOccasion === occ.id;
          return (
            <button
              key={occ.id}
              onClick={() => handleClick(occ)}
              className={`bg-white rounded-2xl p-6 text-center premium-shadow border transition-all duration-300 group ${
                isSelected
                  ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 scale-[1.03] shadow-md'
                  : 'border-[#FDF2F2] hover:border-[#D4AF37]/60 hover:scale-[1.03] hover:shadow-lg'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FDF2F2] flex items-center justify-center mb-3 group-hover:bg-[#570013]/10 transition-colors">
                <span
                  className="material-symbols-outlined text-[#570013] text-2xl group-hover:text-[#800020] transition-colors"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {occ.icon}
                </span>
              </div>
              <p className="font-sans text-xs font-semibold tracking-wider text-[#1b1c17] uppercase group-hover:text-[#570013] transition-colors">
                {occ.label}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => {}}
          className="text-[#570013] font-sans text-xs uppercase tracking-widest font-semibold border-b-2 border-[#570013] pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
        >
          VIEW ALL OCCASIONS
        </button>
      </div>
    </section>
  );
}
