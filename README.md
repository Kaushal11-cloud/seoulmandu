# 🥟 SEOULMANDU KOREAN MART (서울만두)
> **Unwrap The Taste of Korea.**

A premium, contemporary Korean food & mart website crafted specifically for **Seoulmandu Korean Mart** in Dharan, Nepal. Inspired by high-end Korean lifestyle branding, magazine-style visual rhythm, and seamless online ordering.

---

## ✨ Features & Sections

1. **Sticky Glassmorphism Header**:
   - Official **Seoulmandu Korean Mart** logo emblem featuring the iconic N Seoul Tower integration.
   - Smooth anchor navigation with scroll-spy active indicators.
   - Interactive live Cart Drawer counter with bounce animation.
   - Mobile-responsive sliding navigation drawer with logo header.

2. **Full-Screen Cinematic Hero**:
   - High-impact food visual of steaming Korean mandu dumplings.
   - Oversized typography: *"UNWRAP THE TASTE OF KOREA."*
   - Coordinates badge: `37.5°N SEOUL → 27.7°N KTM`.
   - Dual Call-to-Actions (*Order Now* & *Explore Menu*).

3. **Editorial Brand Story ("Korean Flavors. Our Way.")**:
   - Asymmetric magazine composition.
   - Animated authentic seal stamp badge (`서울만두 정성`).
   - Kitchen philosophy quote and core values.

4. **Brand Highlights & Metrics**:
   - Oversized metrics (`100% Korean Flavors`, `01 Unique Vibe`, `∞ Ways to Enjoy`, `26.8°N Dharan`).

5. **Signature Bestsellers (Magazine Spotlight)**:
   - Featured Hero Card for the #1 Bestseller (*Lace-Skirt Gun-Mandu*).
   - Side companion cards (*Melted Cheese Tteokbokki*, *Steamed Mandu*, *Yangnyeom Fried Chicken*).

6. **Interactive Menu with Instant Filtering & Search**:
   - Filter pills (*All Dishes*, *Signature*, *Mandu*, *Street Food*, *Rice & Bowls*, *Drinks & Desserts*).
   - Real-time search bar (type dish name or keyword).
   - Vegetarian-friendly toggle switch.
   - Quick-view modal trigger & 1-click cart addition.

7. **Seoul × Dharan Split-Screen Story**:
   - Dual juxtaposition visual highlighting Seoul's convenience mart culture and Dharan's growing love for authentic Korean grocery imports.
   - Central animated bridge mark.

8. **Visual Food Experience Gallery**:
   - Staggered photography layout showcasing dumpling pleats, cheese pulls, crispy skirts, and table gatherings.

9. **Instagram & Community Section**:
   - Direct integration link to official account: [`@seoulmandu.store`](https://www.instagram.com/seoulmandu.store).
   - Masonry feed with like & comment counts.

10. **Interactive Slide-Over Cart & Ordering System**:
    - Add, increment, decrement, and remove dishes.
    - Dine-in / Takeaway / Delivery selector.
    - Automatic Subtotal calculation in NPR (`Rs. [amount]`).
    - **One-Click WhatsApp Order Generator**: Pre-populates a complete structured order message ready to send via WhatsApp.
    - Food delivery partner integration buttons.

11. **Location & Contact**:
    - Stylized radar-pin map card showing Dharan coordinates (`26.8124° N, 87.2834° E`).
    - Google Maps directions button, phone hotline, and opening hours.

12. **Customer Reviews**:
    - Verified foodie testimonials with 5-star ratings and ordered dish highlights.

13. **Minimal Premium Footer**:
    - Quick navigation, operating hours, social links, and VIP club newsletter signup.

---

## 🚀 Getting Started

### Local Development
To run the website locally:

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start the local development server
npm run dev
```

The site will be live at `http://localhost:5173/`.

### Deploying to GitHub Pages
An automated GitHub Actions workflow is set up at `.github/workflows/deploy.yml`:
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Seoulmandu"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow will automatically trigger, build the website with Vite, and publish it live!

### Zero-Build Static Usage
The project is built with clean vanilla HTML5, CSS3, and modern JavaScript. You can also open `index.html` directly in any web browser or serve it with any static file server.

---

## 🎨 Design System & Customization

- **Colors**:
  - Main Brand Theme (Signature Seoulmandu Gold): `#E5A952`, `#D4953B`, `#F8CE8B`
  - Dark Slate / Obsidian Charcoal: `#0D0E11`, `#15171C`
  - Warm Korean Cream: `#F6F1E8`, `#FAF6F0`
  - Korean Chili / Spice Red: `#D94F45`, `#FF665A`
  - Sage Herb Green: `#8A9A7B`
- **Typography**:
  - Headings: `Outfit` & `Plus Jakarta Sans`
  - Korean Accent: `Noto Sans KR` (Pretendard aesthetic)

### Replacing Business Placeholders & WhatsApp Configuration
All customizable details are clearly marked:
- **WhatsApp Ordering Number**: Configured in [assets/js/main.js](file:///d:/downloads/Seoulmandu/assets/js/main.js#L14-L21) under `SELLER_WHATSAPP_CONFIG.phoneNumber` (`"9779825388189"`).
- `Dharan, Nepal` — in [index.html](file:///d:/downloads/Seoulmandu/index.html)
- `10:00 AM - 9:30 PM` — in [index.html](file:///d:/downloads/Seoulmandu/index.html)
- `+977 9825388189` — in [index.html](file:///d:/downloads/Seoulmandu/index.html)
- `https://www.tiktok.com/@seoulmandu` — in [index.html](file:///d:/downloads/Seoulmandu/index.html) and [products.json](file:///d:/downloads/Seoulmandu/products.json)
- `https://www.instagram.com/seoulmandu.store` — in [index.html](file:///d:/downloads/Seoulmandu/index.html)
- Menu / mart items, prices (`Rs. [420]`), and descriptions — in [assets/js/menu-data.js](file:///d:/downloads/Seoulmandu/assets/js/menu-data.js) and [products.json](file:///d:/downloads/Seoulmandu/products.json)
