import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { initialData } from './initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure directory and db.json exist
function ensureDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

// Read database
export function readDb() {
  ensureDatabase();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database, resetting to initialData:', err);
    writeDb(initialData);
    return initialData;
  }
}

// Write database atomically
export function writeDb(data) {
  ensureDatabase();
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

// --- Products & Catalog ---
export function getProducts(filters = {}) {
  const db = readDb();
  let items = db.products || [];

  if (filters.category) {
    const cat = filters.category.toLowerCase();
    items = items.filter(
      (p) =>
        (p.category && p.category.includes(cat)) ||
        (p.title && p.title.toLowerCase().includes(cat))
    );
  }

  if (filters.occasion) {
    const occ = filters.occasion.toLowerCase();
    items = items.filter(
      (p) => p.occasions && p.occasions.includes(occ)
    );
  }

  if (filters.search) {
    const query = filters.search.toLowerCase();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query))
    );
  }

  return items;
}

export function getProductById(id) {
  const db = readDb();
  return (db.products || []).find((p) => p.id === id) || null;
}

export function getFeaturedProducts() {
  const db = readDb();
  return (db.products || []).filter((p) => p.isFeatured);
}

export function getCrossSellProducts() {
  const db = readDb();
  return (db.products || []).filter((p) => p.isCrossSell);
}

// --- Categories ---
export function getRelationships() {
  const db = readDb();
  return db.relationships || [];
}

export function getOccasions() {
  const db = readDb();
  return db.occasions || [];
}

// --- Shopping Cart (Gift Box) ---
export function getCart() {
  const db = readDb();
  const items = db.cart || [];
  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const eligibleForFreeGiftBox = subtotal >= 50.00 || items.length > 0;
  
  return {
    items,
    itemCount: items.reduce((count, item) => count + (item.quantity || 1), 0),
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping: subtotal > 0 ? 0.00 : 0.00, // Complimentary luxury shipping
    giftPackaging: "Complimentary Signature Burgundy & Gold Keepsake Box",
    total: parseFloat(subtotal.toFixed(2))
  };
}

export function addToCart(payload) {
  const db = readDb();
  const cart = db.cart || [];

  const cartItemId = payload.cartItemId || crypto.randomUUID();
  const newItem = {
    cartItemId,
    id: payload.id,
    title: payload.title,
    price: Number(payload.price) || 0,
    formattedPrice: payload.formattedPrice || `$${(Number(payload.price) || 0).toFixed(2)}`,
    image: payload.image || (payload.images && payload.images[0]?.thumb) || '',
    quantity: Math.max(1, Number(payload.quantity) || 1),
    customization: payload.customization || null,
    addedAt: new Date().toISOString()
  };

  // Check if identical item with identical customization exists
  const existingIdx = cart.findIndex((item) => {
    if (item.id !== newItem.id) return false;
    return JSON.stringify(item.customization) === JSON.stringify(newItem.customization);
  });

  if (existingIdx >= 0) {
    cart[existingIdx].quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }

  db.cart = cart;
  writeDb(db);
  return getCart();
}

export function updateCartItem(cartItemId, quantity) {
  const db = readDb();
  let cart = db.cart || [];

  const item = cart.find((i) => i.cartItemId === cartItemId);
  if (item) {
    const q = Number(quantity);
    if (q <= 0) {
      cart = cart.filter((i) => i.cartItemId !== cartItemId);
    } else {
      item.quantity = q;
    }
    db.cart = cart;
    writeDb(db);
  }
  return getCart();
}

export function removeCartItem(cartItemId) {
  const db = readDb();
  db.cart = (db.cart || []).filter((i) => i.cartItemId !== cartItemId);
  writeDb(db);
  return getCart();
}

export function clearCart() {
  const db = readDb();
  db.cart = [];
  writeDb(db);
  return getCart();
}

// --- Wishlist ---
export function getWishlist() {
  const db = readDb();
  const wishlistIds = db.wishlist || [];
  const products = (db.products || []).filter((p) => wishlistIds.includes(p.id));
  return {
    ids: wishlistIds,
    items: products,
    count: wishlistIds.length
  };
}

export function toggleWishlist(productId) {
  const db = readDb();
  let wishlist = db.wishlist || [];

  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter((id) => id !== productId);
  } else {
    wishlist.push(productId);
  }

  db.wishlist = wishlist;
  writeDb(db);
  return getWishlist();
}

// --- Orders & Checkout ---
export function createOrder(orderPayload) {
  const db = readDb();
  const orders = db.orders || [];

  const cartData = getCart();
  const items = orderPayload.items && orderPayload.items.length > 0 
    ? orderPayload.items 
    : cartData.items;

  if (!items || items.length === 0) {
    throw new Error('Cannot create an order with an empty gift box.');
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const orderId = `AMORE-${Math.floor(100000 + Math.random() * 900000)}`;

  const newOrder = {
    id: orderId,
    customerName: orderPayload.customerName || 'Honored Guest',
    customerEmail: orderPayload.customerEmail || 'boutique@example.com',
    shippingAddress: orderPayload.shippingAddress || '100 Romance Blvd, New York, NY',
    giftMessage: orderPayload.giftMessage || 'With eternal love and adoration.',
    recipientName: orderPayload.recipientName || '',
    items: items,
    subtotal: parseFloat(subtotal.toFixed(2)),
    shippingFee: 0.00,
    total: parseFloat(subtotal.toFixed(2)),
    status: 'In Handcrafting & Engraving',
    paymentMethod: orderPayload.paymentMethod || 'Complimentary Boutique Experience',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  orders.unshift(newOrder);
  db.orders = orders;
  // Automatically clear cart after checkout
  db.cart = [];
  writeDb(db);

  return newOrder;
}

export function getOrderById(orderId) {
  const db = readDb();
  return (db.orders || []).find((o) => o.id.toLowerCase() === orderId.toLowerCase()) || null;
}

export function getAllOrders() {
  const db = readDb();
  return db.orders || [];
}

// --- Reviews ---
export function getReviews(productId) {
  const db = readDb();
  let reviews = db.reviews || [];
  if (productId) {
    reviews = reviews.filter((r) => r.productId === productId);
  }
  return reviews;
}

export function addReview(reviewPayload) {
  const db = readDb();
  const reviews = db.reviews || [];

  const newReview = {
    id: `rev-${crypto.randomUUID().slice(0, 8)}`,
    productId: reviewPayload.productId,
    author: reviewPayload.author || 'Verified Buyer',
    rating: Number(reviewPayload.rating) || 5,
    date: new Date().toISOString().split('T')[0],
    headline: reviewPayload.headline || 'Exquisite Gift',
    comment: reviewPayload.comment,
    verified: true
  };

  reviews.unshift(newReview);
  db.reviews = reviews;
  writeDb(db);
  return newReview;
}
