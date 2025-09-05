# Palaniappa Jewellers E-Commerce Platform

## Overview
A full-stack jewelry e-commerce application built with React frontend and Express backend. The platform features product management, cart functionality, order processing, payment integration, and administrative tools for managing a jewelry business.

## Current State
✅ **Successfully Configured for Replit Environment**
- Database: PostgreSQL configured and migrations applied
- Frontend: React with Vite, serving on port 5000
- Backend: Express.js API with proper CORS and host configuration
- Development workflow: Running successfully
- Deployment: Configured for autoscale deployment

## Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI with shadcn/ui components
- **Styling**: Tailwind CSS with custom theming
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation

### Backend (Express + Node.js)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based authentication
- **File Upload**: Multer for image handling
- **Payment Processing**: Stripe integration (optional)
- **SMS Notifications**: Twilio integration (optional)

### Key Features
- Product catalog with categories and filters
- Shopping cart and checkout functionality
- Admin dashboard for product/order management
- Metal rates management system
- Barcode/QR code generation for products
- Image processing with vintage effects
- Shipping zone and method management
- Estimate generation and billing
- Mobile-responsive design

## Environment Configuration

### Required Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (✅ configured)
- `JWT_SECRET` - JWT signing secret (✅ configured)

### Optional Environment Variables
- `STRIPE_SECRET_KEY` - For payment processing
- `TWILIO_ACCOUNT_SID` & `TWILIO_AUTH_TOKEN` - For SMS notifications
- `ADMIN_EMAIL`, `ADMIN_MOBILE`, `ADMIN_PASSWORD` - Admin credentials

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Express backend
│   ├── services/           # Business logic services
│   ├── utils/              # Utility functions
│   └── routes.ts           # API routes
├── shared/                 # Shared types and schemas
├── migrations/             # Database migrations
└── uploads/                # File upload storage
```

## Recent Changes (Session: September 5, 2025)
- ✅ Successfully imported and configured project for Replit environment
- ✅ Created PostgreSQL database and applied all migrations
- ✅ Generated and configured JWT_SECRET environment variable
- ✅ Configured workflow for development server with proper webview output
- ✅ Verified frontend serves on port 5000 with allowedHosts configuration
- ✅ Confirmed backend API endpoints are working (metal rates, products, videos)
- ✅ Configured autoscale deployment settings for production
- ✅ All core services initialized: metal rates, shipping zones/methods
- ✅ **ULTRA-PREMIUM ROYAL SECONDARY HOME PAGE TRANSFORMATION**:
  - **Hero Section**: Deep royal color scheme (indigo-950, purple-950, slate-950) with animated floating diamonds, crowns, and sparkles
  - **Crown Jewels Collection**: Luxurious dark background with premium golden accents and sophisticated animations
  - **Golden Majesty Collection**: Rich amber/gold themed section with rotating sparkles and 3D hover effects
  - **Diamond Royalty Collection**: Crystal-themed design with floating diamond animations and brilliant hover effects
  - **Royal New Arrivals**: Purple/violet royal theme with animated star effects and "NEW" badges
  - **Premium Features**: Ultra-modern layouts, gradient text effects, backdrop blur, radial lighting, 3D transforms, and luxury typography

## Development Workflow
- **Start Development**: `npm run dev` - Runs both frontend and backend
- **Build for Production**: `npm run build` - Builds frontend and backend
- **Database Migrations**: `npm run db:push` - Applies schema changes

## User Preferences
- Modern, clean UI design with jewelry-appropriate styling
- Mobile-first responsive design
- Professional admin interface for business management
- Performance optimized for product catalog browsing