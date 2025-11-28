# Cashier & Driver Management Platform

## Overview

A smart cashier system designed for shops that integrates inventory management with an automated driver notification system. The platform streamlines the restocking process by automatically alerting delivery drivers when products are running low.

## Key Features

### For Shops
- **Point of Sale (POS) System**: Complete cashier functionality for processing sales
- **Product Management**: Add, edit, and track all shop products
- **Inventory Tracking**: Real-time monitoring of stock levels
- **Driver Management**: Assign and manage delivery drivers for the shop
- **Automated Notifications**: Automatic alerts sent to drivers when stock runs low

### For Drivers
- **Product Assignment**: Each driver is assigned to specific products
- **Smart Notifications**: Receive automatic alerts when assigned products need restocking
- **Multi-Shop Support**: Drivers can serve multiple shops

## How It Works

### 1. Shop Setup
- Shop owner creates an account and sets up their store
- Adds all products with initial stock quantities
- Registers delivery drivers who service the shop

### 2. Product-Driver Assignment
- Each product is assigned to a specific delivery driver
- Drivers receive credentials to access their notification dashboard
- Stock threshold levels are configured for each product

### 3. Automated Restocking Workflow
```
Sale Processed → Stock Updated → Stock Level Checked
                                         ↓
                              Stock Below Threshold?
                                         ↓
                                       YES
                                         ↓
                        Notification Sent to Assigned Driver
```

### 4. Notifications
- Drivers receive real-time notifications when their assigned products are low
- Notifications include:
  - Product name
  - Current stock level
  - Shop location
  - Urgency level

## User Roles

### Shop Owner/Manager
- Manage products and inventory
- Assign drivers to products
- Configure stock thresholds
- Process sales through the cashier system
- View restocking history

### Delivery Driver
- View assigned products across all shops
- Receive restocking notifications
- Update delivery status
- Track restocking history

## Technical Stack

- **Frontend**: Next.js (React)
- **Authentication**: Firebase
- **Real-time Notifications**: Firebase Cloud Messaging
- **State Management**: React Context/Hooks
- **API**: GraphQL

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and helpers
│   ├── providers/      # Context providers
│   ├── graphql/        # GraphQL queries and mutations
│   └── global.d.ts     # TypeScript global definitions
├── public/             # Static assets
│   └── firebase-messaging-sw.js  # Service worker for notifications
├── scripts/            # Build and utility scripts
└── codegen.ts          # GraphQL code generation config
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account for notifications

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Configuration

1. Configure Firebase for push notifications
2. Set up your backend API endpoints
3. Configure GraphQL endpoint in `codegen.ts`
4. Update Firebase messaging service worker configuration

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Generate GraphQL types
npm run codegen
```

## Features Roadmap

- [ ] Real-time inventory dashboard
- [ ] Mobile app for drivers
- [ ] Analytics and reporting
- [ ] Multi-location support
- [ ] Automated ordering system
- [ ] Driver performance metrics
- [ ] SMS/Email notification fallback
- [ ] Barcode scanning integration
- [ ] Low stock prediction using AI
- [ ] Driver route optimization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your license here]

## Contact

[Add contact information]
