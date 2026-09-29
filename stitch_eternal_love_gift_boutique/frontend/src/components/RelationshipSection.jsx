import React, { useState } from 'react';
import { relationships } from '../data/mockData';

export default function RelationshipSection({ onSelectRelationship }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (rel) => {
    setSelectedId(rel.id);
    if (onSelectRelationship) {
      onSelectRelationship(rel);
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-[#735c00]">
          Curated For You
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-[#570013] mt-1">
          Shop by Relationship
        </h3>
      </div>

      <div className="flex justify-start md:justify-center overflow-x-auto gap-6 sm:gap-8 no-scrollbar pb-4 snap-x px-2">
        {relationships.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className="flex-shrink-0 w-32 md:w-36 snap-center group text-center focus:outline-none"
            >
              <div
                className={`w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden mb-3 border-2 transition-all duration-300 relative premium-shadow ${
                  isSelected
                    ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/20 scale-105'
                    : 'border-[#FDF2F2] group-hover:border-[#D4AF37] group-hover:shadow-lg'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#570013]/0 group-hover:bg-[#570013]/10 transition-colors duration-300" />
              </div>
              <p
                className={`font-sans text-[11px] md:text-xs font-semibold tracking-wider transition-colors uppercase ${
                  isSelected
                    ? 'text-[#570013] font-bold underline underline-offset-4 decoration-[#D4AF37]'
                    : 'text-[#570013] group-hover:text-[#735c00]'
                }`}
              >
                {item.title}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
