# Amore & Co. — React Frontend

This directory contains the modular React application converted from the HTML codespace files in the project:
1. `amore_co._premium_romantic_gift_shop_1/code.html` (Boutique E-commerce Storefront)
2. `morning_love_mugs_personalize_your_gift/code.html` (Product Customization Studio)
3. Design tokens and styles defined in `amore_co/DESIGN.md`

---

## Project Structure

```
frontend/
├── preview.html                   # Standalone instant browser runner (No Node required!)
├── index.html                     # Vite entry HTML
├── package.json                   # React 18, Vite & Tailwind configuration
├── vite.config.js                 # Vite bundler config
├── tailwind.config.js             # Boutique design system palette & typography
├── src/
│   ├── main.jsx                   # React root mount
│   ├── App.jsx                    # Navigation router, cart & wishlist state, toast & search
│   ├── index.css                  # Custom design tokens, signature divider, keyframe animations
│   ├── data/
│   │   └── mockData.js            # Extracted data for products, relationships, and occasions
│   ├── components/
│   │   ├── TopAppBar.jsx          # Header with logo, brand motto, search & cart badges
│   │   ├── HeroSection.jsx        # Romantic hero banner with lifestyle imagery & CTAs
│   │   ├── RelationshipSection.jsx# Circular avatar category selector
│   │   ├── OccasionGrid.jsx       # 4-card occasion milestone grid
│   │   ├── ProductCard.jsx        # Reusable product card with wishlist heart toggle
│   │   ├── GiftFinder.jsx         # Interactive gift recommendation questionnaire
│   │   ├── ProductGallery.jsx     # Carousel with transition controls & thumbnail selector
│   │   ├── PersonalizationSection.jsx # Live customizer with real-time text & style engraving
│   │   ├── Accordion.jsx          # Expandable details drawer
│   │   ├── CrossSellSection.jsx   # "Complete the Gift" pairings
│   │   ├── BottomNav.jsx          # Mobile bottom navigation
│   │   └── Footer.jsx             # Luxury boutique footer & copyright
│   └── pages/
│       ├── HomePage.jsx           # Full Boutique Storefront page
│       └── ProductDetailPage.jsx  # Full Morning Love Mugs customization page
```

---

## How to Run

### Option 1: Instant Browser Preview (Zero Installation)
Simply double-click [`preview.html`](file:///c:/Users/LENOVO/Downloads/Rohit/stitch_eternal_love_gift_boutique/frontend/preview.html) or open it with Google Chrome, Microsoft Edge, or any browser. It loads React 18 and Tailwind dynamically.

### Option 2: Standard Vite Development Server
Once Node.js and NPM are in your system PATH:
```bash
npm install
npm run dev
```
Open `http://localhost:3000` to view the live hot-reloading app.
