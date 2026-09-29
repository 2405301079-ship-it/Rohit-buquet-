import React from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartData,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onNavigateProduct
}) {
  if (!isOpen) return null;

  const items = cartData?.items || [];
  const subtotal = cartData?.subtotal || 0;
  const itemCount = cartData?.itemCount || 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF5] shadow-2xl flex flex-col border-l border-[#e0bfbf]/60 transform transition-transform ease-in-out duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#e0bfbf]/40 flex items-center justify-between bg-[#fbf9f1]">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-[#570013] text-2xl">card_giftcard</span>
              <h2 className="font-serif text-xl font-bold text-[#570013]">Your Gift Box</h2>
              <span className="text-xs bg-[#570013] text-white px-2 py-0.5 rounded-full font-sans font-semibold">
                {itemCount}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#584141] hover:text-[#570013] hover:bg-[#FDF2F2] transition-colors"
              aria-label="Close Gift Box"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Complimentary Perks Banner */}
          <div className="bg-[#570013] text-white px-6 py-2.5 text-xs font-sans flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[#D4AF37] text-sm">♥</span>
              <span>Complimentary Burgundy &amp; Gold Gift Box</span>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#D4AF37]">
              INCLUDED
            </span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FDF2F2] text-[#570013] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-3xl">shopping_bag</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#570013] mb-1">
                  Your Gift Box is Empty
                </h3>
                <p className="text-xs text-[#584141] font-sans mb-6 max-w-xs mx-auto">
                  Curate timeless, bespoke personalized keepsakes for the one who holds your heart.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateProduct) onNavigateProduct();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#570013] text-white text-xs font-sans tracking-wider uppercase font-semibold hover:bg-[#800020] transition-colors shadow-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId || item.id}
                  className="bg-white rounded-2xl p-4 border border-[#e0bfbf]/40 shadow-xs flex gap-4 transition-all"
                >
                  {/* Thumbnail */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-xl border border-[#e0bfbf]/30 flex-shrink-0"
                    />
                  )}

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-bold text-[#1b1c17]">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#584141] hover:text-[#570013] p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                      <p className="text-xs font-bold text-[#570013] font-sans mt-0.5">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>

                      {/* Personalization Details Tag */}
                      {item.customization && (
                        <div className="mt-2 text-[11px] bg-[#FFFDF5] p-2 rounded-lg border border-[#D4AF37]/30 text-[#584141] space-y-0.5">
                          <div className="font-semibold text-[#735c00] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">stylus_note</span>
                            <span>Bespoke Engravings:</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[10px] pl-1">
                            <span>Mug 1: <strong>{item.customization.mug1Name}</strong></span>
                            <span>Mug 2: <strong>{item.customization.mug2Name}</strong></span>
                            {item.customization.estDate && (
                              <span>Est: <strong>{item.customization.estDate}</strong></span>
                            )}
                            {item.customization.fontStyle && (
                              <span className="capitalize">Font: <strong>{item.customization.fontStyle}</strong></span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#FDF2F2]">
                      <span className="text-[11px] text-[#584141] font-sans">Quantity</span>
                      <div className="flex items-center border border-[#e0bfbf] rounded-lg overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, (item.quantity || 1) - 1)}
                          className="px-2 py-0.5 hover:bg-[#FDF2F2] text-[#570013] text-xs font-bold transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-sans font-semibold text-[#1b1c17]">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, (item.quantity || 1) + 1)}
                          className="px-2 py-0.5 hover:bg-[#FDF2F2] text-[#570013] text-xs font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#e0bfbf]/40 bg-[#fbf9f1] space-y-4">
              <div className="space-y-1.5 text-xs font-sans text-[#584141]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1b1c17]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Signature Burgundy Keepsake Box</span>
                  <span className="text-[#735c00] font-semibold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Courier Delivery</span>
                  <span className="text-[#735c00] font-semibold">COMPLIMENTARY</span>
                </div>
                <div className="signature-divider my-2" />
                <div className="flex justify-between text-sm font-bold text-[#570013]">
                  <span>Total</span>
                  <span className="font-serif text-lg">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-4 rounded-full bg-[#570013] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#800020] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Proceed to Luxury Checkout</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              <p className="text-[10px] text-center text-[#584141]">
                ♥ Handcrafted with 24K gold accents in our boutique workshop
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
