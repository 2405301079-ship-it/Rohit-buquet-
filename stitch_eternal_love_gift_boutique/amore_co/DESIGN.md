---
name: Amore & Co.
colors:
  surface: '#fbf9f1'
  surface-dim: '#dcdad2'
  surface-bright: '#fbf9f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4ec'
  surface-container: '#f0eee6'
  surface-container-high: '#eae8e0'
  surface-container-highest: '#e4e3db'
  on-surface: '#1b1c17'
  on-surface-variant: '#584141'
  inverse-surface: '#30312c'
  inverse-on-surface: '#f3f1e9'
  outline: '#8c7071'
  outline-variant: '#e0bfbf'
  surface-tint: '#af2b3e'
  primary: '#570013'
  on-primary: '#ffffff'
  primary-container: '#800020'
  on-primary-container: '#ff828a'
  inverse-primary: '#ffb3b5'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#2c2627'
  on-tertiary: '#ffffff'
  tertiary-container: '#423c3c'
  on-tertiary-container: '#afa6a6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b5'
  on-primary-fixed: '#40000b'
  on-primary-fixed-variant: '#8e0f28'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ebe0e0'
  tertiary-fixed-dim: '#cec4c4'
  on-tertiary-fixed: '#1f1a1b'
  on-tertiary-fixed-variant: '#4c4546'
  background: '#fbf9f1'
  on-background: '#1b1c17'
  surface-variant: '#e4e3db'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md-mobile:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  title-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-padding: 80px
---

## Brand & Style
The brand personality is rooted in "Sophisticated Romance"—a blend of high-end boutique elegance and emotional warmth. The design system targets a discerning audience looking for thoughtful, premium gifts, evoking a sense of curated beauty and timelessness. 

The aesthetic follows a **Premium Minimalism** approach with **Skeuomorphic touches**. It prioritizes heavy whitespace, editorial-style typography, and tactile softness. The interface should feel like a high-end stationery shop or a luxury florist: breathable, calm, and intentional. Visual interest is generated through high-contrast typography and subtle, gold-leaf-inspired accents rather than heavy ornamentation.

## Colors
The palette is designed to feel warm and invitational. 

- **Primary (Burgundy):** Used for primary Call-to-Actions (CTAs), headers, and high-impact brand moments. It represents passion and authority.
- **Secondary (Gold):** Reserved for subtle accents, icons, and interactive hover states. Use sparingly to maintain a "premium" rather than "flashy" feel.
- **Tertiary (Blush):** Used for large surface areas, section backgrounds, and container fills to soften the UI.
- **Neutral (Ivory):** The primary background color for the main content area to reduce eye strain and provide a more "parchment-like" feel than pure white.
- **Pure White:** Reserved specifically for cards and input fields to make them pop against the ivory background.

## Typography
The typographic hierarchy creates an editorial feel. **Playfair Display** provides a high-contrast, classic serif look for storytelling and product titles. **Montserrat** is used for functional text, ensuring clarity and modern balance.

For a luxury feel, use `label-caps` for small metadata like categories or "Free Shipping" tags. Ensure `body-lg` is used for product descriptions to maintain a premium reading experience. Avoid using bold weights for body text; instead, use color shifts (Burgundy) to emphasize key information.

## Layout & Spacing
This design system utilizes a **Fixed Grid** for desktop and a **Fluid Grid** for mobile. 

- **Desktop:** 12-column grid with 24px gutters. Use generous margins (64px+) to create a "boutique" gallery feel.
- **Mobile:** 4-column grid with 16px margins. 
- **Rhythm:** Use an 8px base unit. Section spacing should be aggressive (80px to 120px) to allow the premium products room to breathe.
- **Alignment:** Central alignment is preferred for hero sections and empty states to reinforce the romantic, balanced aesthetic.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Ambient Shadows**. 

1. **Base:** Neutral Ivory (#FFFDF5).
2. **Cards:** Pure White (#FFFFFF) with a very soft, diffused shadow (0px 4px 20px, 4% opacity Burgundy tint) to create a "floating on air" effect.
3. **Dividers:** Instead of harsh lines, use 1px horizontal rules in Blush (#FDF2F2) or, for a more decorative feel, a thin Gold (#D4AF37) line for primary section breaks.
4. **Interactive Elements:** On hover, buttons and cards should slightly lift using a more pronounced, warm shadow.

## Shapes
The shape language is "Hyper-Rounded" to evoke softness and comfort.

- **Cards & Modals:** Use a 24px (2xl) radius to soften the edges of the screen.
- **Buttons:** Fully pill-shaped (100px) to invite interaction and provide a modern, friendly contrast to the sharp serif typography.
- **Icons:** Use 2px stroke weights with rounded end-caps. Avoid sharp corners in any iconography.

## Components

### Buttons
- **Primary:** Burgundy fill, White text, pill-shaped. Subtle gold glow on hover.
- **Secondary:** Transparent with Burgundy 1.5px border or Gold text for a softer look.
- **Micro-interaction:** On "Add to Cart," the button should briefly transition to a Gold checkmark or heart icon.

### Input Fields
- **Style:** Pure white background, 12px rounded corners, with a thin Blush border.
- **Focus State:** Border transitions to Gold with a soft 2px outer glow.

### Cards (Product)
- **Visuals:** Edge-to-edge imagery at the top. The bottom section uses the `title-sm` for the name and `body-md` in Burgundy for the price.
- **Hover:** Image zooms in 5% (scale) within the container, and a "Quick Add" heart icon appears in the top right.

### Chips & Tags
- **Style:** Blush background with Burgundy text. Used for "Personalized," "New In," or "Best Seller." Keep these small and uppercase using `label-caps`.

### Dividers & Flourishes
- Use a "Signature Divider": A horizontal line that fades out at the edges, with a small Gold heart or dot in the absolute center.