import { Router } from 'express';
import { getWishlist, toggleWishlist } from '../db/store.js';

const router = Router();

// GET /api/wishlist - Get all wishlist items and IDs
router.get('/', (req, res) => {
  try {
    const wishlist = getWishlist();
    res.json({
      success: true,
      data: wishlist
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/wishlist/toggle - Add or remove product from wishlist
router.post('/toggle', (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, error: 'productId is required' });
    }

    const wishlist = toggleWishlist(productId);
    const isSaved = wishlist.ids.includes(productId);

    res.json({
      success: true,
      isSaved,
      message: isSaved ? 'Saved to Wishlist' : 'Removed from Wishlist',
      data: wishlist
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
