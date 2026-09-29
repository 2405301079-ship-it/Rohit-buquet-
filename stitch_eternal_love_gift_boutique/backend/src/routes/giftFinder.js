import { Router } from 'express';
import { getProducts } from '../db/store.js';

const router = Router();

// POST /api/gift-finder/recommend - Concierge recommendation engine
router.post('/recommend', (req, res) => {
  try {
    const { recipient, occasion, budget } = req.body;

    const allProducts = getProducts();

    // Recommendation logic matching category and occasion
    let matchedProducts = allProducts.filter((p) => {
      const matchRecipient = recipient
        ? p.category && p.category.includes(recipient.toLowerCase())
        : true;
      const matchOccasion = occasion
        ? p.occasions && p.occasions.includes(occasion.toLowerCase())
        : true;
      return matchRecipient && matchOccasion;
    });

    if (matchedProducts.length === 0) {
      // Fallback to featured items
      matchedProducts = allProducts.filter((p) => p.isFeatured);
    }

    const primaryRecommendation = matchedProducts[0] || allProducts[0];

    // Generate personalized romantic concierge note
    const recipientFormatted = recipient
      ? recipient.charAt(0).toUpperCase() + recipient.slice(1)
      : 'beloved';
    const occasionFormatted = occasion
      ? occasion.charAt(0).toUpperCase() + occasion.slice(1)
      : 'celebration';

    const conciergeNote = `For your ${recipientFormatted}'s ${occasionFormatted}, our artisans recommend the "${primaryRecommendation.title}". Each piece is individually crafted with gold detailing to make this milestone unforgettable.`;

    res.json({
      success: true,
      data: {
        recommendation: primaryRecommendation,
        alternatives: matchedProducts.slice(1, 3),
        conciergeNote,
        deliveryPromise: 'Complimentary white-glove boxed delivery in our signature burgundy gift box.'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
