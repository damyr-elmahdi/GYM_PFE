# Complete Libraries List - Scholify Project

## Backend Libraries (Laravel/PHP)
*Note: Complete list would require composer.json file*

### Core Framework
- **Laravel** - PHP web application framework
- **PHP** >= 8.0 - Server-side scripting language

### Likely Backend Dependencies (Standard Laravel)
- Illuminate packages (Laravel core components)
- Symfony components
- Monolog (logging)
- SwiftMailer/Symfony Mailer
- Carbon (date manipulation)
- Doctrine DBAL
- And other Composer dependencies in vendor/

---

##Frontend Libraries (React/JavaScript)

### Core Framework & Build Tools
- **React** ^19.0.0 - JavaScript library for building user interfaces
- **React DOM** ^19.0.0 - React package for working with the DOM
- **Vite** ^6.2.0 - Frontend build tool and dev server
- **@vitejs/plugin-react** ^4.3.4 - Vite plugin for React support

### Routing & Navigation
- **react-router-dom** ^7.3.0 - Declarative routing for React

### HTTP Client
- **axios** ^1.8.3 - Promise-based HTTP client for API calls

### UI Components & Interactions
- **react-tabs** ^6.1.0 - Tab components for React
- **swiper** ^11.2.5 - Touch slider/carousel component
- **framer-motion** ^12.6.3 - Animation and gesture library

### Notifications & Feedback
- **react-toastify** ^11.0.5 - Toast notification library

### Icons & Visual Elements
- **react-icons** ^5.5.0 - Popular icon library for React
- **boxicons** ^2.1.4 - Simple vector iconset
- **remixicon** ^4.6.0 - Neutral-style system symbols

### Animations & Effects
- **scrollreveal** ^4.0.9 - JavaScript library for scroll animations

### Styling & CSS
- **Tailwind CSS** ^3.4.17 - Utility-first CSS framework
- **PostCSS** ^8.5.3 - CSS post-processor
- **Autoprefixer** ^10.4.21 - PostCSS plugin for vendor prefixes

### Development Tools
- **ESLint** ^9.21.0 - JavaScript linting utility
- **@eslint/js** ^9.21.0 - ESLint JavaScript rules
- **eslint-plugin-react-hooks** ^5.1.0 - ESLint rules for React Hooks
- **eslint-plugin-react-refresh** ^0.4.19 - ESLint plugin for React Refresh
- **globals** ^15.15.0 - Global identifiers for ESLint
- **@types/react** ^19.0.10 - TypeScript definitions for React
- **@types/react-dom** ^19.0.4 - TypeScript definitions for React DOM

---

## Database & Server
- **MySQL/MariaDB** - Database management system
- **phpMyAdmin** - Web-based MySQL administration tool (optional)

---

## Development Environment
- **XAMPP/WAMP/MAMP** - Local development server stack
- **Composer** - PHP dependency manager
- **Node.js & npm** - JavaScript runtime and package manager

---

## Library Categories Summary

### Frontend (React): 15 production dependencies
- **UI/UX**: 7 libraries (icons, animations, components)
- **Core**: 2 libraries (React, React DOM)
- **Utilities**: 6 libraries (routing, HTTP, notifications, etc.)

### Development: 12 dev dependencies
- **Build Tools**: 2 libraries (Vite, plugins)
- **Styling**: 3 libraries (Tailwind, PostCSS, Autoprefixer)
- **Code Quality**: 7 libraries (ESLint and related plugins)

### Backend: Laravel ecosystem
- **Core**: Laravel framework with standard dependencies
- **Database**: MySQL/MariaDB integration

---

## Quick Setup Commands

### Frontend Dependencies
```bash
cd frontend
npm install
```

### Backend Dependencies (if vendor/ missing)
```bash
composer install
```

### Environment Setup
```bash
cp .env.example .env
php artisan key:generate
```
