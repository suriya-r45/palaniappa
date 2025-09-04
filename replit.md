# Jewelry Business Full-Stack Application

## Overview
A comprehensive jewelry e-commerce platform built with React frontend and Express.js backend, featuring product management, shopping cart, user authentication, and payment processing.

## Project Structure
- **Frontend**: React with TypeScript, Vite, TailwindCSS, shadcn/ui components
- **Backend**: Express.js with TypeScript, Drizzle ORM, PostgreSQL
- **Authentication**: JWT-based with bcrypt password hashing
- **Payments**: Stripe integration (requires STRIPE_SECRET_KEY)
- **SMS**: Twilio integration for notifications (requires credentials)

## Technology Stack
- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion, Radix UI
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: JWT, bcrypt, Passport.js
- **Payment**: Stripe
- **File Upload**: Multer with image processing
- **Notifications**: Twilio SMS

## Database Schema
- Users with role-based access (admin/guest)
- Products with detailed jewelry specifications (weight, material, pricing)
- Shopping cart functionality
- Metal rates management
- Order tracking and estimates
- Categories and collections

## Environment Configuration
- Database is configured and running on Replit PostgreSQL
- Development server runs on port 5000 with proper proxy configuration
- Vite development server configured for Replit environment

## Current Status
- ✅ Database created and migrations applied
- ✅ Frontend and backend integrated and running
- ✅ All API endpoints functional
- ✅ Vite configuration optimized for Replit proxy
- ✅ Deployment configuration set up
- ⚠️ Requires STRIPE_SECRET_KEY for payment features
- ⚠️ Requires Twilio credentials for SMS features

## Key Features
- Product catalog with advanced filtering
- Shopping cart with session management
- User authentication and profiles
- Admin dashboard for product/order management
- Metal rates tracking
- Barcode generation for products
- WhatsApp integration for customer support
- Responsive mobile-first design

## Development Notes
- Uses static metal rates (no live API) for development
- File uploads stored in /uploads directory
- Attached assets served from /attached_assets
- Images processed with Sharp for optimization
- Vintage effects available for product photos

## Recent Changes (September 2025)
- Successfully imported from GitHub
- Database schema applied and initialized
- All dependencies installed and configured
- Workflow configured for Replit environment
- Frontend proxy configuration verified working