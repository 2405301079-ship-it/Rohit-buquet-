import React from 'react';

export default function PersonalizationSection({
  mug1Name,
  setMug1Name,
  mug2Name,
  setMug2Name,
  estDate,
  setEstDate,
  fontStyle,
  setFontStyle
}) {
  // Compute font family style for the live preview
  const getPreviewFontStyle = () => {
    switch (fontStyle) {
      case 'modern':
        return 'font-sans uppercase tracking-[0.25em] font-medium';
      case 'classic':
        return 'font-serif tracking-normal font-semibold';
      case 'elegant':
      default:
        return 'font-serif italic font-bold tracking-wide';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 custom-shadow mb-8 border border-[#e4e3db]">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#FDF2F2]">
        <h2 className="font-serif text-xl sm:text-2xl text-[#570013] font-bold flex items-center">
          <span className="material-symbols-outlined text-[#D4AF37] mr-2 text-2xl">
            edit_note
          </span>
          Make It Yours
        </h2>
        <span className="text-[10px] uppercase font-sans font-bold text-[#735c00] bg-[#FFFDF5] border border-[#e0bfbf] px-2.5 py-1 rounded-full">
          Complimentary Engraving
        </span>
      </div>

      <div className="space-y-5">
        {/* Mug 1 Name */}
        <div>
          <label
            htmlFor="mug1-name"
            className="block text-xs font-sans font-semibold tracking-wider text-[#584141] uppercase mb-1.5"
          >
            Name or Monogram for Mug 1
          </label>
          <input
            id="mug1-name"
            type="text"
            value={mug1Name}
            onChange={(e) => setMug1Name(e.target.value)}
            placeholder="e.g. Hers, Sophia, Queen"
            maxLength={20}
            className="w-full bg-[#FFFDF5] border border-[#e0bfbf] rounded-xl px-4 py-3 font-sans text-sm text-[#1b1c17] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25 transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Mug 2 Name */}
        <div>
          <label
            htmlFor="mug2-name"
            className="block text-xs font-sans font-semibold tracking-wider text-[#584141] uppercase mb-1.5"
          >
            Name or Monogram for Mug 2
          </label>
          <input
            id="mug2-name"
            type="text"
            value={mug2Name}
            onChange={(e) => setMug2Name(e.target.value)}
            placeholder="e.g. His, Liam, King"
            maxLength={20}
            className="w-full bg-[#FFFDF5] border border-[#e0bfbf] rounded-xl px-4 py-3 font-sans text-sm text-[#1b1c17] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25 transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Est. Date */}
        <div>
          <label
            htmlFor="est-date"
            className="block text-xs font-sans font-semibold tracking-wider text-[#584141] uppercase mb-1.5"
          >
            Established Date (Optional)
          </label>
          <input
            id="est-date"
            type="date"
            value={estDate}
            onChange={(e) => setEstDate(e.target.value)}
            className="w-full bg-[#FFFDF5] border border-[#e0bfbf] rounded-xl px-4 py-3 font-sans text-sm text-[#1b1c17] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25 transition-all"
          />
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-xs font-sans font-semibold tracking-wider text-[#584141] uppercase mb-2">
            Typography Script Style
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'elegant', title: 'Elegant', subtitle: 'Script' },
              { id: 'modern', title: 'Modern', subtitle: 'Clean Sans' },
              { id: 'classic', title: 'Classic', subtitle: 'Roman Serif' }
            ].map((style) => (
              <label key={style.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="font_style"
                  value={style.id}
                  checked={fontStyle === style.id}
                  onChange={(e) => setFontStyle(e.target.value)}
                  className="sr-only peer"
                />
                <div className="border border-[#e0bfbf] rounded-xl p-3 text-center transition-all peer-checked:border-[#570013] peer-checked:bg-[#570013]/5 peer-checked:shadow-xs hover:border-[#D4AF37]">
                  <span className={`block text-sm mb-0.5 text-[#1b1c17] ${
                    style.id === 'elegant' ? 'font-serif italic font-bold' : style.id === 'modern' ? 'font-sans uppercase font-bold text-xs' : 'font-serif font-bold'
                  }`}>
                    {style.title}
                  </span>
                  <span className="text-[10px] text-[#584141] font-sans">
                    {style.subtitle}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Live Engraving Preview */}
      <div className="mt-6 p-5 bg-[#FFFDF5] rounded-xl border border-[#D4AF37]/40">
        <div className="flex items-center justify-between text-[#735c00] mb-3">
          <span className="flex items-center text-xs font-sans font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined mr-1.5 text-base text-[#D4AF37]">
              visibility
            </span>
            Live Studio Preview
          </span>
          <span className="text-[10px] text-[#584141]">Real-time Engraving</span>
        </div>

        {/* Realistic Mug Preview Rendering */}
        <div className="grid grid-cols-2 gap-3 py-2">
          {/* Mug 1 Preview Card */}
          <div className="bg-white rounded-xl p-3 border border-[#FDF2F2] shadow-xs flex flex-col items-center justify-center text-center min-h-[90px] relative overflow-hidden">
            <span className="text-[9px] uppercase tracking-widest text-[#735c00] font-sans absolute top-2 left-2">
              Mug 1
            </span>
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-1 text-[#D4AF37]">
              <span className="material-symbols-outlined text-sm">local_cafe</span>
            </div>
            <p className={`text-[#570013] text-base sm:text-lg leading-tight ${getPreviewFontStyle()}`}>
              {mug1Name.trim() || 'Hers'}
            </p>
            {estDate && (
              <span className="text-[9px] text-[#735c00] font-sans mt-0.5">
                Est. {estDate.slice(0, 4)}
              </span>
            )}
          </div>

          {/* Mug 2 Preview Card */}
          <div className="bg-white rounded-xl p-3 border border-[#FDF2F2] shadow-xs flex flex-col items-center justify-center text-center min-h-[90px] relative overflow-hidden">
            <span className="text-[9px] uppercase tracking-widest text-[#735c00] font-sans absolute top-2 left-2">
              Mug 2
            </span>
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-1 text-[#D4AF37]">
              <span className="material-symbols-outlined text-sm">local_cafe</span>
            </div>
            <p className={`text-[#570013] text-base sm:text-lg leading-tight ${getPreviewFontStyle()}`}>
              {mug2Name.trim() || 'His'}
            </p>
            {estDate && (
              <span className="text-[9px] text-[#735c00] font-sans mt-0.5">
                Est. {estDate.slice(0, 4)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
