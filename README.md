# Amore & Co. — Romantic Gift Boutique (Full-Stack)

A complete, luxury boutique e-commerce application featuring a Node.js Express REST API backend and a responsive React 18 + Tailwind CSS frontend.

---

## Quick Start

You can start both the backend and frontend at once using either:
- **Double-click `start-boutique.bat`** (Windows command prompt launcher)
- Or run in PowerShell:
  ```powershell
  .\start-boutique.ps1
  ```
- Or run individually using NPM:
  ```bash
  # Terminal 1: Start Backend API (Port 5000)
  npm run dev:backend

  # Terminal 2: Start Frontend Web App (Port 3000)
  npm run dev:frontend
  ```

---

## Project Structure

```
Rohit/
├── package.json                           # Root convenience scripts
├── start-boutique.bat                     # 1-Click Windows Full-Stack Launcher
├── start-boutique.ps1                     # PowerShell Launcher
└── stitch_eternal_love_gift_boutique/
    ├── backend/                           # Node.js + Express REST API Backend
    │   ├── package.json
    │   ├── .env
    │   ├── README.md                      # Backend API Documentation
    │   ├── test-api.mjs                   # Automated 10-point API test suite
    │   ├── data/
    │   │   └── db.json                    # Persistent JSON database
    │   └── src/
    │       ├── app.js                     # Express app, middleware & CORS
    │       ├── server.js                  # Server startup & port listener
    │       ├── db/
    │       │   ├── store.js               # Persistent database helper
    │       │   └── initialData.js         # Initial products, reviews & orders
    │       └── routes/
    │           ├── products.js            # Products catalog & filtering
    │           ├── categories.js          # Relationships & Occasions
    │           ├── cart.js                # Gift Box Cart & custom engravings
    │           ├── wishlist.js            # Saved favorites
    │           ├── orders.js              # Checkout orders & tracking
    │           ├── giftFinder.js          # Concierge recommendation engine
    │           └── reviews.js             # Customer verified reviews
    └── frontend/                          # React 18 + Vite + Tailwind Frontend
        ├── index.html
        ├── vite.config.js                 # Configured with /api proxy to port 5000
        ├── src/
        │   ├── services/
        │   │   └── api.js                 # Central API client with offline fallback
        │   ├── components/
        │   │   ├── CartDrawer.jsx         # Luxury slide-over Gift Box drawer
        │   │   ├── CheckoutModal.jsx      # Boutique checkout & order tracking
        │   │   ├── GiftFinder.jsx         # Connected concierge gift finder
        │   │   └── TopAppBar.jsx          # Interactive cart & wishlist triggers
        │   └── App.jsx                    # Connected full-stack state management
```

---

## Backend API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/products` | All products (supports `?category=`, `?occasion=`, `?search=`) |
| `GET` | `/api/products/featured` | Curated "Made for Two" homepage items |
| `GET` | `/api/products/cross-sell` | Curated gift pairings ("Complete the Gift") |
| `GET` | `/api/products/:id` | Detailed product specs with reviews |
| `GET` | `/api/categories/relationships`| Recipient categories (Girlfriend, Boyfriend, Wife, Husband) |
| `GET` | `/api/categories/occasions` | Occasion milestones (Anniversary, Birthday, Valentine's, Proposal) |
| `GET` | `/api/cart` | Retrieve current Gift Box items & subtotal |
| `POST` | `/api/cart/items` | Add product with personalized custom engravings |
| `PUT` | `/api/cart/items/:id` | Update quantity |
| `DELETE` | `/api/cart/items/:id` | Remove item from Gift Box |
| `GET` | `/api/wishlist` | Saved favorite gift items |
| `POST` | `/api/wishlist/toggle` | Toggle product favorite status |
| `POST` | `/api/gift-finder/recommend` | Concierge personalized matchmaking algorithm |
| `POST` | `/api/orders` | Place checkout order with gift note |
| `GET` | `/api/orders/:id` | Track order fulfillment & delivery |
| `GET` | `/api/reviews/:productId` | Product reviews |
| `POST` | `/api/reviews` | Submit verified customer review |

---

## Verifying the API
To run the automated backend test suite:
```bash
npm run test:backend
```
