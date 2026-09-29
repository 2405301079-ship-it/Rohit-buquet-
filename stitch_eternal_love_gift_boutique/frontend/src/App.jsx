import React, { useState, useEffect } from 'react';
import TopAppBar from './components/TopAppBar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import {
  getCart,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
  getWishlistApi,
  toggleWishlistApi
} from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartData, setCartData] = useState({
    items: [],
    itemCount: 0,
    subtotal: 0,
    total: 0
  });
  const [wishlistIds, setWishlistIds] = useState(['morning-love-mugs']);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Sync initial Cart and Wishlist from Backend API
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [cart, wish] = await Promise.allSettled([
          getCart(),
          getWishlistApi()
        ]);

        if (cart.status === 'fulfilled' && cart.value?.items) {
          setCartData(cart.value);
        }
        if (wish.status === 'fulfilled' && wish.value?.ids) {
          setWishlistIds(wish.value.ids);
        }
      } catch (err) {
        console.warn('Could not sync with backend on mount:', err);
      }
    }
    loadInitialData();
  }, []);

  // Scroll to top upon changing page
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add item to cart / gift box & sync with backend
  const handleAddToCart = async (product) => {
    // Optimistic UI update
    const tempItem = {
      cartItemId: `temp-${Date.now()}`,
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image || product.images?.[0]?.thumb,
      customization: product.customization
    };

    setCartData((prev) => {
      const items = [...(prev.items || []), tempItem];
      const subtotal = items.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);
      return {
        items,
        itemCount: items.reduce((count, i) => count + (i.quantity || 1), 0),
        subtotal: parseFloat(subtotal.toFixed(2)),
        total: parseFloat(subtotal.toFixed(2))
      };
    });

    showToast(`"${product.title}" added to your Gift Box ♥`);

    // Backend sync
    try {
      const updated = await addToCartApi(product);
      if (updated) {
        setCartData(updated);
      }
    } catch (err) {
      console.warn('Backend cart add failed, using optimistic state:', err);
    }
  };

  // Update item quantity in cart
  const handleUpdateQuantity = async (cartItemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }

    setCartData((prev) => {
      const items = prev.items.map((i) =>
        i.cartItemId === cartItemId ? { ...i, quantity } : i
      );
      const subtotal = items.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);
      return {
        ...prev,
        items,
        itemCount: items.reduce((count, i) => count + (i.quantity || 1), 0),
        subtotal: parseFloat(subtotal.toFixed(2)),
        total: parseFloat(subtotal.toFixed(2))
      };
    });

    try {
      const updated = await updateCartItemApi(cartItemId, quantity);
      if (updated) setCartData(updated);
    } catch (err) {
      console.warn('Backend update quantity failed:', err);
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (cartItemId) => {
    setCartData((prev) => {
      const items = prev.items.filter((i) => i.cartItemId !== cartItemId);
      const subtotal = items.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);
      return {
        ...prev,
        items,
        itemCount: items.reduce((count, i) => count + (i.quantity || 1), 0),
        subtotal: parseFloat(subtotal.toFixed(2)),
        total: parseFloat(subtotal.toFixed(2))
      };
    });

    try {
      const updated = await removeCartItemApi(cartItemId);
      if (updated) setCartData(updated);
    } catch (err) {
      console.warn('Backend remove item failed:', err);
    }
  };

  // Toggle favorite wishlist & sync with backend
  const handleToggleFavorite = async (product) => {
    const isCurrentlySaved = wishlistIds.includes(product.id);
    if (isCurrentlySaved) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast('Removed from saved list');
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast('Saved to your Wishlist ♥');
    }

    try {
      const res = await toggleWishlistApi(product.id);
      if (res?.data?.ids) {
        setWishlistIds(res.data.ids);
      }
    } catch (err) {
      console.warn('Backend wishlist toggle failed, keeping local state:', err);
    }
  };

  // Order placed callback
  const handleOrderSuccess = (newOrder) => {
    setCartData({ items: [], itemCount: 0, subtotal: 0, total: 0 });
    showToast(`Order #${newOrder.id} placed with distinction! ♥`);
  };

  // Toast feedback trigger
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5] text-[#1b1c17] selection:bg-[#D4AF37]/30 selection:text-[#570013]">
      {/* 1. Global Navigation Header */}
      <TopAppBar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartData.itemCount || 0}
        wishlistCount={wishlistIds.length}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenWishlist={() => {
          showToast(`You have ${wishlistIds.length} saved gift keepsakes ♥`);
        }}
      />

      {/* 2. Main Viewport Container */}
      <main className="flex-grow pt-16 md:pt-20">
        {currentPage === 'home' ? (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={() => handleNavigate('product-detail')}
            onToggleFavorite={handleToggleFavorite}
            wishlistIds={wishlistIds}
          />
        ) : (
          <ProductDetailPage
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            wishlistIds={wishlistIds}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* 3. Luxury Brand Footer */}
      <Footer />

      {/* 4. Mobile Bottom Nav */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartData.itemCount || 0}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenWishlist={() => {
          showToast(`You have ${wishlistIds.length} saved gift keepsakes ♥`);
        }}
      />

      {/* 5. Luxury Gift Box Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartData={cartData}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setCheckoutModalOpen(true)}
        onNavigateProduct={() => handleNavigate('product-detail')}
      />

      {/* 6. Luxury Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartData={cartData}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 7. Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-1/2 translate-x-1/2 md:right-8 md:translate-x-0 z-50 bg-[#570013] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-[#D4AF37]/50 text-xs sm:text-sm font-sans font-semibold tracking-wide animate-bounce">
          <span className="text-[#D4AF37] text-base">♥</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 8. Quick Concierge Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-[#e0bfbf] animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg font-bold text-[#570013]">
                Search Amore &amp; Co.
              </h3>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="text-[#584141] hover:text-[#570013] p-1"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mugs, keychains, anniversary gifts..."
                className="w-full bg-[#FFFDF5] border border-[#e0bfbf] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                autoFocus
              />
              <span className="material-symbols-outlined absolute right-3 top-3 text-gray-400">
                search
              </span>
            </div>
            <div className="text-xs text-[#584141]">
              <span className="font-semibold text-[#735c00] uppercase tracking-wider block mb-2">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Morning Love Mugs', 'Leather Keychains', 'Anniversary Box', 'Wife Gift'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchModalOpen(false);
                        handleNavigate('product-detail');
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#FDF2F2] hover:bg-[#570013] hover:text-white transition-colors text-xs font-sans text-[#570013]"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
