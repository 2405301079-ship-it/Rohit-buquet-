import {
  relationships as mockRelationships,
  occasions as mockOccasions,
  featuredProducts as mockFeatured,
  productDetailData as mockProductDetail,
  crossSellProducts as mockCrossSell
} from '../data/mockData';

const API_BASE = '/api';

async function request(endpoint, options = {}) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    const res = await fetch(`${API_BASE}${endpoint}`, config);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err) {
    console.warn(`[API] Fetch to ${endpoint} failed, utilizing graceful fallback:`, err.message);
    throw err;
  }
}

// --- Catalog & Products ---
export async function getProducts(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.occasion) params.append('occasion', filters.occasion);
    if (filters.search) params.append('search', filters.search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return await request(`/products${query}`);
  } catch {
    return mockFeatured;
  }
}

export async function getFeaturedProducts() {
  try {
    return await request('/products/featured');
  } catch {
    return mockFeatured;
  }
}

export async function getCrossSellProducts() {
  try {
    return await request('/products/cross-sell');
  } catch {
    return mockCrossSell;
  }
}

export async function getProductById(id) {
  try {
    return await request(`/products/${id}`);
  } catch {
    return mockProductDetail;
  }
}

// --- Categories ---
export async function getRelationships() {
  try {
    return await request('/categories/relationships');
  } catch {
    return mockRelationships;
  }
}

export async function getOccasions() {
  try {
    return await request('/categories/occasions');
  } catch {
    return mockOccasions;
  }
}

// --- Cart & Gift Box ---
export async function getCart() {
  try {
    return await request('/cart');
  } catch {
    return { items: [], itemCount: 0, subtotal: 0, total: 0 };
  }
}

export async function addToCartApi(itemPayload) {
  try {
    return await request('/cart/items', {
      method: 'POST',
      body: JSON.stringify(itemPayload)
    });
  } catch {
    return null;
  }
}

export async function updateCartItemApi(cartItemId, quantity) {
  try {
    return await request(`/cart/items/${cartItemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    });
  } catch {
    return null;
  }
}

export async function removeCartItemApi(cartItemId) {
  try {
    return await request(`/cart/items/${cartItemId}`, {
      method: 'DELETE'
    });
  } catch {
    return null;
  }
}

export async function clearCartApi() {
  try {
    return await request('/cart/clear', {
      method: 'POST'
    });
  } catch {
    return null;
  }
}

// --- Wishlist ---
export async function getWishlistApi() {
  try {
    return await request('/wishlist');
  } catch {
    return { ids: ['morning-love-mugs'], items: [], count: 1 };
  }
}

export async function toggleWishlistApi(productId) {
  try {
    return await request('/wishlist/toggle', {
      method: 'POST',
      body: JSON.stringify({ productId })
    });
  } catch {
    return null;
  }
}

// --- Concierge Recommendation ---
export async function getConciergeRecommendation(recipient, occasion) {
  try {
    return await request('/gift-finder/recommend', {
      method: 'POST',
      body: JSON.stringify({ recipient, occasion })
    });
  } catch {
    return {
      recommendation: mockProductDetail,
      conciergeNote: `A timeless keepsake recommended for your ${recipient || 'beloved'} to commemorate your ${occasion || 'celebration'}.`
    };
  }
}

// --- Checkout & Orders ---
export async function createOrderApi(orderData) {
  return await request('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

export async function getOrderApi(orderId) {
  return await request(`/orders/${orderId}`);
}
