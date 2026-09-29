import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from '../db/store.js';

const router = Router();

// GET /api/cart - Get current gift box state
router.get('/', (req, res) => {
  try {
    const cart = getCart();
    res.json({
      success: true,
      data: cart
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/cart/items - Add item (with optional personalization)
router.post('/items', (req, res) => {
  try {
    const { id, title, price, formattedPrice, image, quantity, customization } = req.body;
    if (!id || !title || price === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required item fields: id, title, price'
      });
    }

    const updatedCart = addToCart({
      id,
      title,
      price,
      formattedPrice,
      image,
      quantity,
      customization
    });

    res.status(201).json({
      success: true,
      message: `"${title}" added to your Gift Box`,
      data: updatedCart
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/cart/items/:cartItemId - Update quantity
router.put('/items/:cartItemId', (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity === undefined) {
      return res.status(400).json({ success: false, error: 'Quantity is required' });
    }

    const updatedCart = updateCartItem(req.params.cartItemId, quantity);
    res.json({
      success: true,
      data: updatedCart
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/cart/items/:cartItemId - Remove item from gift box
router.delete('/items/:cartItemId', (req, res) => {
  try {
    const updatedCart = removeCartItem(req.params.cartItemId);
    res.json({
      success: true,
      message: 'Item removed from Gift Box',
      data: updatedCart
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/cart/clear - Empty the gift box
router.post('/clear', (req, res) => {
  try {
    const clearedCart = clearCart();
    res.json({
      success: true,
      message: 'Gift Box cleared',
      data: clearedCart
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
