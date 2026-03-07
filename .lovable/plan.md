# ApniDukaan – Phase 1: Core Shopping Experience

## Overview

Build the foundation of a modern grocery commerce app for a kirana store in Dinanagar, Punjab. Phase 1 covers the customer-facing shopping experience and essential admin features. Uses **Lovable Cloud** (Supabase) for backend, auth, and database.

## Design System

&nbsp;

- **Inspiration**: Blinkit/Zepto modern grocery UI

---

## Database Setup (Supabase)

- **profiles** table: name, phone, address, village, customer_type (retail/wholesale)
- **categories** table: name, icon, sort_order
- **products** table: name, description, image_url, price, wholesale_price, stock, category_id, unit, is_active
- **orders** table: user_id, items (jsonb), total, status, delivery_slot, address, village, phone, customer_type
- **user_roles** table: for admin access control (secure role-based approach)
- Row-level security on all tables

## Authentication

- Supabase Auth with email/phone login
- Profile auto-creation on signup
- Admin role via secure user_roles table (not password in env)

---

## Pages & Features

### 1. Homepage

- Hero section: "Dinanagar ka Apna Online Kirana" with saffron/green branding
- CTA buttons: "Order Now" and "Wholesale Portal"
- Stats bar: 500+ products, 30 min delivery, free delivery above ₹500
- Category quick-links grid
- WhatsApp floating button in corner
- Footer with store address, phone, and links

### 2. Product Catalog (`/products`)

- Category filter tabs (All, Grains, Oil & Ghee, Spices, Daily Use)
- Search bar with suggestions
- Responsive product grid (2 cols mobile, 3 tablet, 5 desktop)
- Product cards: image, name, price, unit, stock badge, add-to-cart button
- Skeleton loading states

### 3. Smart Cart (Floating Drawer)

- Slide-out cart drawer from right side
- Quantity +/- controls, remove item button
- Subtotal, delivery fee, total breakdown
- "Proceed to Checkout" button
- Cart persisted in localStorage

### 4. Checkout (`/checkout`)

- Form: Full name, WhatsApp number, Address, Village (dropdown), Delivery slot (Morning/Afternoon/Evening)
- Cash on Delivery only
- Order summary sidebar
- Save order to Supabase on submit
- Success page with order ID

### 5. Order Tracking (`/orders`)

- List of customer's past orders
- Status timeline: Placed → Confirmed → Packed → Out for Delivery → Delivered
- Order details expandable

### 6. Repeat Order

- "Reorder" button on past orders to add all items back to cart

---

## Admin Dashboard (`/admin`)

### 6. Admin Overview

- Protected route (role-based access)
- Stats cards: Orders today, Revenue today, Pending orders, Low stock alerts
- Quick action buttons

### 7. Order Management

- Orders table with filters (status, date, customer type)
- Status update dropdown (Pending → Confirmed → Packed → Out for Delivery → Delivered)

### 8. Product Management

- Add/edit/delete products
- Image upload, price, stock, category, toggle active/inactive
- Low stock highlighting

### 9. Basic Inventory

- Stock levels table
- Auto stock deduction when order confirmed
- Low stock alerts (< 10 units)

---

## Technical Features

- PWA manifest for "Add to Home Screen"
- Lazy loaded images with skeleton loaders
- Error boundaries
- SEO meta tags (Hindi + English)
- Mobile-first responsive design
- Toast notifications (sonner)

---

## Future Phases (not built now)

- Phase 2: Wholesale portal, ledger system, delivery driver panel
- Phase 3: AI chatbot, voice ordering, AI shopping list, demand prediction
- Phase 4: Google Maps integration, delivery routes, sales analytics, promotions