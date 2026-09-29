import { Router } from 'express';
import { createOrder, getOrderById, getAllOrders } from '../db/store.js';

const router = Router();

// GET /api/orders - Get all orders
router.get('/', (req, res) => {
  try {
    const orders = getAllOrders();
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/orders/:id - Track order by ID
router.get('/:id', (req, res) => {
  try {
    const order = getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/orders - Place a new gift order
router.post('/', (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      shippingAddress,
      giftMessage,
      recipientName,
      items,
      paymentMethod
    } = req.body;

    if (!customerName || !customerEmail || !shippingAddress) {
      return res.status(400).json({
        success: false,
        error: 'Please provide customerName, customerEmail, and shippingAddress'
      });
    }

    const order = createOrder({
      customerName,
      customerEmail,
      shippingAddress,
      giftMessage,
      recipientName,
      items,
      paymentMethod
    });

    res.status(201).json({
      success: true,
      message: 'Gift order placed with distinction. Our artisans have commenced preparation.',
      data: order
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
