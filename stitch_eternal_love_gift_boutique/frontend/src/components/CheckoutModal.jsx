import React, { useState } from 'react';
import { createOrderApi } from '../services/api';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartData,
  onOrderSuccess
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [giftMessage, setGiftMessage] = useState('With all my love, on our special day.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const items = cartData?.items || [];
  const subtotal = cartData?.subtotal || 0;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !shippingAddress) {
      setErrorMessage('Please complete your name, email, and shipping address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const orderPayload = {
        customerName,
        customerEmail,
        shippingAddress,
        recipientName: recipientName || customerName,
        giftMessage,
        items
      };

      const createdOrder = await createOrderApi(orderPayload);
      setCompletedOrder(createdOrder);
      if (onOrderSuccess) onOrderSuccess(createdOrder);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF5] rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-[#e0bfbf] relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#584141] hover:text-[#570013] hover:bg-[#FDF2F2] transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {completedOrder ? (
          /* Order Success Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#570013] text-[#D4AF37] flex items-center justify-center mb-4 shadow-lg animate-bounce">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>

            <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-[#735c00]">
              Order Confirmed &amp; In Production
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#570013] mt-1 mb-2">
              Thank You, {completedOrder.customerName}
            </h3>
            <p className="text-xs text-[#584141] font-sans mb-6 max-w-md mx-auto">
              Your bespoke gift order has been received by our master craftspeople. We have begun handcrafting and custom engraving your pieces.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#e0bfbf]/50 text-left text-xs font-sans space-y-3 mb-6 shadow-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#FDF2F2]">
                <span className="text-[#584141]">Order Reference</span>
                <span className="font-mono font-bold text-[#570013]">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#584141]">Estimated Delivery</span>
                <span className="font-semibold text-[#1b1c17]">{completedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#584141]">Fulfillment Status</span>
                <span className="px-2 py-0.5 rounded-full bg-[#FDF2F2] text-[#570013] font-bold text-[10px]">
                  {completedOrder.status}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#FDF2F2]">
                <span className="text-[#584141] font-semibold">Total Paid</span>
                <span className="font-serif text-base font-bold text-[#570013]">
                  ${completedOrder.total?.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 rounded-full bg-[#570013] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#800020] transition-all shadow-md"
            >
              Return to Boutique
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[#735c00]">
                Complimentary White-Glove Service
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#570013]">
                Luxury Boutique Checkout
              </h3>
              <p className="text-xs text-[#584141] mt-1">
                Total: <span className="font-bold text-[#570013]">${subtotal.toFixed(2)}</span> ({items.length} gift item{items.length !== 1 ? 's' : ''})
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-xl text-xs border border-red-200">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-sans font-semibold text-[#570013] uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Julian Vance"
                    className="w-full bg-white border border-[#e0bfbf] rounded-xl px-3.5 py-2.5 text-xs text-[#1b1c17] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-semibold text-[#570013] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. julian@example.com"
                    className="w-full bg-white border border-[#e0bfbf] rounded-xl px-3.5 py-2.5 text-xs text-[#1b1c17] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-semibold text-[#570013] uppercase tracking-wider mb-1">
                  Recipient Name (Optional)
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Elena Rostova (Leave blank if for yourself)"
                  className="w-full bg-white border border-[#e0bfbf] rounded-xl px-3.5 py-2.5 text-xs text-[#1b1c17] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-semibold text-[#570013] uppercase tracking-wider mb-1">
                  Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street address, apartment/suite, city, state, postal code"
                  className="w-full bg-white border border-[#e0bfbf] rounded-xl px-3.5 py-2.5 text-xs text-[#1b1c17] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-semibold text-[#735c00] uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Handwritten Gift Card Message</span>
                  <span className="text-[10px] text-[#584141] font-normal">Gold Foil Card</span>
                </label>
                <textarea
                  rows={2}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Enter a personal romantic note to be penned inside your gift box..."
                  className="w-full bg-white border border-[#e0bfbf] rounded-xl px-3.5 py-2.5 text-xs text-[#1b1c17] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] italic"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#570013] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#800020] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Securing Order...</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">lock</span>
                      <span>Place Boutique Order (${subtotal.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#584141] pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-[#D4AF37]">shield</span>
                  Encrypted &amp; Secure
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-[#D4AF37]">card_giftcard</span>
                  Luxury Box Included
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
