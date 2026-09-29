import { Router } from 'express';
import { getReviews, addReview } from '../db/store.js';

const router = Router();

// GET /api/reviews/:productId - Get reviews for a specific product
router.get('/:productId', (req, res) => {
  try {
    const reviews = getReviews(req.params.productId);
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/reviews - Add customer review
router.post('/', (req, res) => {
  try {
    const { productId, author, rating, headline, comment } = req.body;
    if (!productId || !comment) {
      return res.status(400).json({
        success: false,
        error: 'productId and comment are required'
      });
    }

    const review = addReview({
      productId,
      author,
      rating: Number(rating) || 5,
      headline,
      comment
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted with thanks',
      data: review
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
