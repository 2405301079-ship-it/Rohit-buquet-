import { Router } from 'express';
import { getRelationships, getOccasions } from '../db/store.js';

const router = Router();

// GET /api/categories/relationships
router.get('/relationships', (req, res) => {
  try {
    const relationships = getRelationships();
    res.json({
      success: true,
      count: relationships.length,
      data: relationships
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/categories/occasions
router.get('/occasions', (req, res) => {
  try {
    const occasions = getOccasions();
    res.json({
      success: true,
      count: occasions.length,
      data: occasions
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
