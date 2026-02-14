E-Commerce frontend built with Next.js (App Router), TypeScript and Tailwind CSS.

**Status:** Development

**Stack:** Next.js (App Router), TypeScript, React, Tailwind CSS, React Query, Stripe

**Purpose:** This repository contains the UI for an e-commerce storefront (product listing, product details, cart, checkout, profile, blog).

**Quick start**

Prerequisites:

- Node.js (v18+ recommended)
- A package manager: `npm`, `yarn`, or `pnpm`

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Common scripts (run with `npm run <script>`):

- `dev` - start development server
- `build` - build for production
- `start` - start production server (after build)
- `lint` - run linters (if configured)

Environment variables
Create a `.env.local` at the project root and set required values. Example variables used by this project:

- `NEXT_PUBLIC_API_URL` - API base URL for the backend (example: `https://api.example.com/api/v1/`)
- `NEXT_PUBLIC_APP_URL` - frontend URL (used for Stripe return URLs)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` - Stripe keys for payments
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - (optional) Cloudinary credentials
- OAuth / Auth credentials (Google client id / secret)

Do NOT commit secrets. Add real values to `.env.local` before running checkout/payment flows.

Project structure (important folders)

- `app/` - Next.js App Router routes and pages
- `components/` - React components grouped by feature
- `context/` - React context providers (Auth, Cart, Wishlist, etc.)
- `lib/` - small utilities and API wrappers (axios instance, helpers)
- `types/` - TypeScript types and interfaces
- `public/` - static assets (images)

Notes

- This project uses the App Router (`app/`) and server components for data fetching in many pages.
- Cart and checkout rely on client-only contexts and local storage (see `context/CartContext.tsx`).
- Stripe is integrated via `@stripe/react-stripe-js` and server-side create-payment-intent endpoint.

Deployment

- Vercel is recommended for seamless Next.js deployments. Ensure the environment variables above are set in the Vercel dashboard.

Troubleshooting

- If you see auth or API errors, verify `NEXT_PUBLIC_API_URL` and auth environment variables.
- For Stripe issues, ensure publishable and secret keys match the environment (test vs live).

Contributing

- Feel free to open issues or PRs. Follow the existing code style and patterns.

Contact

- If you need help running the project locally, tell me what OS and Node version you have and I can provide targeted steps.

---

File reference: see project root for `app/`, `components/`, and `context/` folders.
