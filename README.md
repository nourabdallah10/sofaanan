# BAHA Furniture Shop

A production-ready React furniture shop website built with modern technologies, featuring luxury design, full internationalization (English & Hebrew with RTL support), dark/light mode, and mobile-first responsive design.

## Tech Stack

- **React 18** + **TypeScript** - Modern React with type safety
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing with SEO-friendly URLs
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **react-i18next** - Internationalization (English & Hebrew with RTL support)
- **LocalStorage** - Theme and favorites persistence

## Features

- ✅ **Dark & Light mode** with system preference detection and smooth transitions
- ✅ **English & Hebrew** language support with automatic RTL layout
- ✅ **Luxury furniture-style design** with elegant typography and soft shadows
- ✅ **Mobile-first responsive design** with touch-optimized interactions
- ✅ **Fully accessible** UI components with ARIA labels and keyboard navigation
- ✅ **Clean component-based architecture** with TypeScript
- ✅ **Image optimization** with lazy loading and proper sizing
- ✅ **Smooth animations** and micro-interactions
- ✅ **SEO-friendly** URLs and semantic HTML

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm (or yarn/pnpm)
- Modern web browser

### Install Dependencies

```bash
npm install
```

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or another port if 5173 is occupied).

### Build for Production

Build the production-ready optimized bundle:

```bash
npm run build
```

The output will be in the `dist/` directory, ready to be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

This serves the `dist/` folder to test the production build before deployment.

### Lint Code

Run ESLint to check for code quality issues:

```bash
npm run lint
```

## Project Structure

```
BAHAWebsite/
├── public/
│   └── Images/              # Static images (see Image Structure below)
│       ├── logo.png
│       ├── Beds/
│       ├── Sofas/           # Maps to "Couches" category
│       ├── Tables/
│       └── Fabrics/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── layout/         # Layout components (Header, Footer, PageContainer)
│   │   └── products/       # Product-related components (Card, Grid, Carousel)
│   ├── contexts/           # React contexts (Theme, Favorites)
│   ├── data/               # Static data files
│   │   └── products.json   # Product data (see Adding Products below)
│   ├── hooks/              # Custom React hooks
│   │   ├── useProducts.ts  # Product data hooks
│   │   ├── useFavorites.ts # Favorites management
│   │   └── useLocalStorage.ts # LocalStorage utilities
│   ├── i18n/               # Internationalization
│   │   ├── config.ts       # i18next configuration
│   │   └── locales/        # Translation files
│   │       ├── en.json     # English translations
│   │       └── he.json     # Hebrew translations
│   ├── pages/              # Page components (routed)
│   ├── types/              # TypeScript type definitions
│   │   └── product.ts      # Product interfaces
│   ├── utils/              # Utility functions
│   │   ├── imagePaths.ts   # Image path helpers
│   │   └── productUtils.ts # Product data utilities
│   ├── router.tsx          # React Router configuration
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles and Tailwind imports
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Adding New Products

### Step 1: Add Product Images

1. Create a folder for your product in the appropriate category directory:
   ```
   public/Images/{Category}/{product-slug}/
   ```
   
   For example:
   ```
   public/Images/Beds/luxury-king-bed/
   ```

2. Add product images (JPG, PNG, or WebP):
   - Name them sequentially: `1.jpg`, `2.jpg`, `3.jpg`, etc.
   - Use high-quality images (recommended: 1200x900px minimum)
   - First image (`1.jpg`) will be used as the primary/thumbnail image

### Step 2: Add Product Data

Open `src/data/products.json` and add a new product object:

```json
{
  "id": "unique-product-id",
  "slug": "luxury-king-bed",
  "category": "Beds",
  "name": {
    "en": "Luxury King Bed",
    "he": "מיטה מלכותית יוקרתית"
  },
  "shortDescription": {
    "en": "A luxurious king-size bed with elegant design",
    "he": "מיטת קינג מפוארת עם עיצוב אלגנטי"
  },
  "fullDescription": {
    "en": "Experience ultimate comfort with our luxury king bed. Crafted with premium materials and attention to detail.\n\nFeatures:\n- Premium wood construction\n- Available in multiple finishes\n- Includes headboard",
    "he": "חוו נוחות מקסימלית עם מיטת הקינג היוקרתית שלנו. מעוצבת מחומרים מעולים ותשומת לב לפרטים.\n\nתכונות:\n- מבנה עץ מעולה\n- זמין במגוון גימורים\n- כולל כותרת ראש"
  },
  "dimensions": {
    "width": 200,
    "height": 120,
    "depth": 220
  },
  "materials": [
    "Premium Oak Wood",
    "Memory Foam Mattress",
    "Luxury Fabric Upholstery"
  ],
  "price": 12500,
  "images": ["1.jpg", "2.jpg", "3.jpg"],
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

### Step 3: Product Data Schema

```typescript
interface Product {
  id: string;                    // Unique identifier (e.g., "bed-001")
  slug: string;                  // URL-friendly name (must match image folder name)
  category: 'Beds' | 'Couches' | 'Tables' | 'Fabrics';
  name: {
    en: string;                  // English name
    he: string;                  // Hebrew name
  };
  shortDescription: {
    en: string;                  // Brief description (English)
    he: string;                  // Brief description (Hebrew)
  };
  fullDescription: {
    en: string;                  // Detailed description (English, supports \n for line breaks)
    he: string;                  // Detailed description (Hebrew)
  };
  dimensions: {
    width: number;               // Width in centimeters
    height: number;              // Height in centimeters
    depth: number;               // Depth in centimeters
  };
  materials: string[];           // Array of material descriptions
  price: number;                 // Price (no currency symbol, format in code)
  images: string[];              // Array of image filenames (e.g., ["1.jpg", "2.jpg"])
  createdAt: string;             // ISO 8601 date string
}
```

### Important Notes:

- **slug** must exactly match the image folder name
- **category** must be one of: `'Beds'`, `'Couches'`, `'Tables'`, or `'Fabrics'`
- For "Couches" category, images go in `Sofas/` folder (automatic mapping)
- All text fields must have both `en` and `he` translations
- Images array should list filenames in order (first image is primary)
- Use `\n` in `fullDescription` for line breaks

## Image Structure

### Directory Organization

```
public/Images/
├── logo.png                    # Site logo (required)
├── Beds/                       # Bed category images
│   └── {product-slug}/        # Product folder (slug from products.json)
│       ├── 1.jpg              # Primary image (thumbnail)
│       ├── 2.jpg              # Secondary image
│       ├── 3.jpg              # Additional images
│       └── ...
├── Sofas/                      # Couch category images (Note: category is "Couches" in code)
│   └── {product-slug}/
│       └── ...
├── Tables/                     # Table category images
│   └── {product-slug}/
│       └── ...
└── Fabrics/                    # Fabric category images
    └── {product-slug}/
        └── ...
```

### Image Guidelines

1. **File Naming**: Use sequential numbers: `1.jpg`, `2.jpg`, `3.jpg`, etc.
2. **Image Format**: JPG, PNG, or WebP (JPG recommended for photos)
3. **Recommended Size**: 
   - Minimum: 1200x900px
   - Optimal: 1920x1440px
   - Aspect Ratio: 4:3 recommended
4. **File Size**: Optimize images (aim for < 500KB per image)
5. **First Image**: `1.jpg` is used as the thumbnail/primary image
6. **Image List**: Must match `images` array in `products.json`

### Using Image Utilities

The project provides utilities for generating image paths:

```typescript
import { 
  getProductImagePath, 
  getPrimaryProductImagePath,
  getLogoPath 
} from '@/utils/imagePaths';

// Get logo path
const logo = getLogoPath(); // '/Images/logo.png'

// Get specific product image
const image = getProductImagePath('Beds', 'luxury-king-bed', '1.jpg');
// Returns: '/Images/Beds/luxury-king-bed/1.jpg'

// Get primary image (convenience)
const primary = getPrimaryProductImagePath('Couches', 'modern-sofa');
// Returns: '/Images/Sofas/modern-sofa/1.jpg' (auto-maps Couches → Sofas)
```

**Important**: The category "Couches" automatically maps to the "Sofas" folder for images.

## Run & Build Instructions

### Development Mode

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

The site will open at `http://localhost:5173` with hot module replacement enabled.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The build output is in the `dist/` folder:
- Optimized and minified JavaScript
- CSS extraction and optimization
- Asset optimization
- Tree-shaking (unused code removal)

### Deployment

The `dist/` folder can be deployed to:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Configure GitHub Actions to build and deploy
- **Any static host**: Upload `dist/` folder contents

### Environment Variables

Currently, no environment variables are required. All configuration is in code.

## Internationalization

### Adding Translations

Edit the translation files in `src/i18n/locales/`:

- `en.json` - English translations
- `he.json` - Hebrew translations

Both files use the same structure. Add new keys as needed:

```json
{
  "newSection": {
    "key": "English text",
    "key2": "More English text"
  }
}
```

### Using Translations in Components

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('newSection.key')}</h1>;
}
```

The language automatically switches document direction (LTR/RTL) when Hebrew is selected.

## Styling & Design System

### Design Tokens

The project uses CSS variables defined in `src/index.css`:

- **Colors**: Light/dark mode colors
- **Typography**: Font families and sizes
- **Spacing**: Consistent spacing scale
- **Shadows**: Soft shadows for depth
- **Transitions**: Smooth animations

### Tailwind Utilities

Custom utilities available:

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.card-luxury` - Luxury card with hover effects
- `.shadow-soft`, `.shadow-soft-lg`, `.shadow-luxury` - Custom shadows
- `.animate-fade-in`, `.animate-slide-up` - Animation utilities

### RTL Support

RTL is automatically handled:
- Document direction switches on language change
- Tailwind RTL utilities (e.g., `rtl:space-x-reverse`)
- Spacing and positioning adjust automatically

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- ✅ Code splitting with React Router
- ✅ Image lazy loading
- ✅ Optimized bundle size (tree-shaking)
- ✅ CSS optimization
- ✅ Font optimization
- ✅ Smooth scroll behavior
- ✅ Efficient state management

## Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Color contrast (WCAG AA compliant)
- ✅ Screen reader friendly

## License

Private project - All rights reserved

## Support

For issues or questions, please refer to the project documentation or contact the development team.
