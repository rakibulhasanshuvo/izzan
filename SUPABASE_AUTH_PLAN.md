# Supabase Admin Authentication Plan

This document outlines the strategy for implementing secure admin authentication for the Izzan project using Supabase.

## Overview
We will use Supabase Auth to protect all routes under `/admin`. This provides industry-standard security (JWT, session cookies, password hashing) with minimal maintenance.

## 1. Setup Requirements
To activate this plan, you will need:
- A Supabase Project ([supabase.com](https://supabase.com))
- Project API Credentials:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- An admin user created in the Supabase Dashboard (**Authentication > Users**).

## 2. Technical Implementation

### A. Client/Server Utilities
Create helper functions to initialize the Supabase client based on the environment:
- **Browser Client**: For client-side interactions (logging in/out).
- **Server Client**: For Server Components and Server Actions.
- **Middleware Client**: Specifically for the Next.js Middleware to refresh sessions.

### B. Middleware Protection
Implement a `middleware.ts` in the `src/` directory to:
1. Intercept any request to `/admin/*`.
2. Check if a valid session exists via Supabase.
3. Redirect unauthenticated users to `/login`.

### C. Login Interface
Create a premium `/login` route featuring:
- Minimalist design consistent with the Izzan brand.
- Email/Password form.
- Smooth transition/loading states using Framer Motion.

## 3. Deployment Notes
When deploying to Vercel:
1. Add the Supabase URL and Anon Key to the **Environment Variables** in the Vercel Dashboard.
2. Ensure the `SITE_URL` in Supabase settings matches your Vercel deployment URL for proper redirects.

---
**Status**: Pending Client Approval.
**Ready for implementation?**: Yes, dependencies (`@supabase/supabase-js`, `@supabase/ssr`) are already installed.
