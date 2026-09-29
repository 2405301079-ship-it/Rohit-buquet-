import React, { useState } from 'react';

export default function Accordion({ items = [] }) {
  const [openIndexes, setOpenIndexes] = useState([0]); // First open by default

  const toggleIndex = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="border-t border-[#e0bfbf] divide-y divide-[#e0bfbf]">
      {items.map((item, idx) => {
        const isOpen = openIndexes.includes(idx);
        return (
          <div key={idx} className="py-4">
            <button
              type="button"
              onClick={() => toggleIndex(idx)}
              className="w-full flex justify-between items-center text-left font-serif text-base sm:text-lg text-[#1b1c17] hover:text-[#570013] transition-colors focus:outline-none"
            >
              <span className="font-semibold">{item.title}</span>
              <span
                className={`material-symbols-outlined text-[#584141] transition-transform duration-300 text-[22px] ${
                  isOpen ? 'rotate-180 text-[#570013]' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            {isOpen && (
              <div className="pt-3.5 pb-1 font-sans text-sm text-[#584141] leading-relaxed animate-fadeIn">
                {typeof item.content === 'string' ? (
                  <p>{item.content}</p>
                ) : Array.isArray(item.content) ? (
                  <ul className="list-disc pl-5 space-y-1.5">
                    {item.content.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  item.content
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
