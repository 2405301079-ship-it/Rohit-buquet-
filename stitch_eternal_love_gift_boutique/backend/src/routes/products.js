import { Router } from 'express';
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getCrossSellProducts,
  getReviews
} from '../db/store.js';

const router = Router();

// GET /api/products - Get all products with optional filters
router.get('/', (req, res) => {
  try {
    const { category, occasion, search } = req.query;
    const products = getProducts({ category, occasion, search });
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/featured - Curated collection for homepage
router.get('/featured', (req, res) => {
  try {
    const products = getFeaturedProducts();
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/cross-sell - Curated gift pairings
router.get('/cross-sell', (req, res) => {
  try {
    const products = getCrossSellProducts();
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/:id - Single product with gallery and reviews
router.get('/:id', (req, res) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    const reviews = getReviews(product.id);
    res.json({
      success: true,
      data: {
        ...product,
        reviews
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
