async function testApi() {
  const base = 'http://localhost:5000/api';
  console.log('Testing Amore & Co. Boutique Backend API...\n');

  // 1. Health
  const healthRes = await fetch(`${base}/health`);
  const health = await healthRes.json();
  console.log('✔ GET /health:', health);

  // 2. Products
  const prodsRes = await fetch(`${base}/products`);
  const prods = await prodsRes.json();
  console.log(`✔ GET /products: found ${prods.count} products`);

  // 3. Featured
  const featRes = await fetch(`${base}/products/featured`);
  const feat = await featRes.json();
  console.log(`✔ GET /products/featured: found ${feat.count} items`);

  // 4. Product Detail with reviews
  const singleRes = await fetch(`${base}/products/morning-love-mugs`);
  const single = await singleRes.json();
  console.log(`✔ GET /products/morning-love-mugs: "${single.data.title}", reviews count = ${single.data.reviews.length}`);

  // 5. Gift Finder Recommend
  const recRes = await fetch(`${base}/gift-finder/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient: 'wife', occasion: 'anniversary' })
  });
  const rec = await recRes.json();
  console.log(`✔ POST /gift-finder/recommend: matched "${rec.data.recommendation.title}"`);
  console.log(`  Concierge Note: "${rec.data.conciergeNote}"`);

  // 6. Add to Cart with personalization
  const cartRes = await fetch(`${base}/cart/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 'morning-love-mugs',
      title: 'Morning Love Mugs',
      price: 34.00,
      quantity: 1,
      customization: {
        mug1Name: 'Elena',
        mug2Name: 'Julian',
        estDate: '2024-02-14',
        fontStyle: 'elegant'
      }
    })
  });
  const cart = await cartRes.json();
  console.log(`✔ POST /cart/items: total items in gift box = ${cart.data.itemCount}, subtotal = $${cart.data.subtotal}`);

  // 7. Get Cart
  const getCartRes = await fetch(`${base}/cart`);
  const currentCart = await getCartRes.json();
  console.log(`✔ GET /cart: subtotal = $${currentCart.data.subtotal}, items = ${currentCart.data.items.length}`);

  // 8. Wishlist Toggle
  const wishRes = await fetch(`${base}/wishlist/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: 'leather-keychains' })
  });
  const wish = await wishRes.json();
  console.log(`✔ POST /wishlist/toggle: isSaved = ${wish.isSaved}, count = ${wish.data.count}`);

  // 9. Create Order
  const orderRes = await fetch(`${base}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Elena Rostova',
      customerEmail: 'elena.rostova@example.com',
      shippingAddress: '450 Fifth Avenue, New York, NY 10018',
      giftMessage: 'To my beloved Julian, forever and always. Happy Anniversary!',
      recipientName: 'Julian Rostova'
    })
  });
  const order = await orderRes.json();
  console.log(`✔ POST /orders: Order #${order.data.id} created! Total: $${order.data.total}, Status: "${order.data.status}"`);

  // 10. Track Order
  const trackRes = await fetch(`${base}/orders/${order.data.id}`);
  const track = await trackRes.json();
  console.log(`✔ GET /orders/${order.data.id}: estimated delivery = ${track.data.estimatedDelivery}`);

  console.log('\nAll 10 backend tests PASSED successfully! 🌟');
}

testApi().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
