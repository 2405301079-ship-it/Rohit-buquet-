# Amore & Co. — Boutique Node.js REST API Backend

Sophisticated e-commerce REST API backend for the Amore & Co. romantic gift boutique, powering products, custom personalized engravings, shopping cart / gift box management, wishlists, concierge gift recommendations, customer reviews, and order fulfillment.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
# or
npm start
```
The server will start at `http://localhost:5000`.

---

## API Endpoints Reference

### Health Check
- `GET /api/health` — Service health & version status

### Products & Collections
- `GET /api/products` — Retrieve all products. Supports query parameters:
  - `?category=girlfriend` (or boyfriend, wife, husband)
  - `?occasion=anniversary` (or birthday, valentines, proposal)
  - `?search=mugs`
- `GET /api/products/featured` — Curated "Made for Two" featured products for the storefront
- `GET /api/products/cross-sell` — Curated gift pairings ("Complete the Gift")
- `GET /api/products/:id` — Product detail view with gallery images, materials, shipping, and reviews

### Categories
- `GET /api/categories/relationships` — 4 core recipient milestone categories
- `GET /api/categories/occasions` — Occasion milestones (Anniversary, Birthday, Valentine's, Proposal)

### Shopping Cart (Gift Box)
- `GET /api/cart` — Current cart contents, item count, and subtotal
- `POST /api/cart/items` — Add an item with custom engraving details:
  ```json
  {
    "id": "morning-love-mugs",
    "title": "Morning Love Mugs",
    "price": 34.00,
    "quantity": 1,
    "customization": {
      "mug1Name": "Elena",
      "mug2Name": "Julian",
      "estDate": "2024-02-14",
      "fontStyle": "elegant"
    }
  }
  ```
- `PUT /api/cart/items/:cartItemId` — Update quantity: `{ "quantity": 2 }`
- `DELETE /api/cart/items/:cartItemId` — Remove item from Gift Box
- `POST /api/cart/clear` — Clear all items

### Wishlist
- `GET /api/wishlist` — Get saved favorite IDs and product details
- `POST /api/wishlist/toggle` — Toggle favorite status: `{ "productId": "morning-love-mugs" }`

### Concierge Gift Finder
- `POST /api/gift-finder/recommend` — Intelligent personalized gift matchmaking:
  ```json
  {
    "recipient": "wife",
    "occasion": "anniversary",
    "budget": "luxury"
  }
  ```

### Customer Reviews
- `GET /api/reviews/:productId` — Get verified customer reviews
- `POST /api/reviews` — Submit new review:
  ```json
  {
    "productId": "morning-love-mugs",
    "author": "Liam S.",
    "rating": 5,
    "headline": "Pure perfection",
    "comment": "The gold script is breathtaking."
  }
  ```

### Checkout & Orders
- `GET /api/orders` — List order history
- `GET /api/orders/:id` — Track order status by ID (e.g. `AMORE-94281`)
- `POST /api/orders` — Place order:
  ```json
  {
    "customerName": "Elena Rostova",
    "customerEmail": "elena@example.com",
    "shippingAddress": "450 5th Ave, New York, NY",
    "giftMessage": "Happy Anniversary, my love!"
  }
  ```
