# Recipe Explorer — Next.js App Router

A culinary catalog and recipe exploration web application built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

Browse global recipes, filter by cuisine and difficulty, search across titles and ingredients, view detailed step-by-step instructions with checkable ingredient lists, and draft new recipes.

---

## Features

- **Recipe Catalog & Listing**: Search by recipe title, cuisine, or ingredients with instant filter controls.
- **Dynamic SSG Recipe Detail Pages (`/recipes/[id]`)**: Pre-rendered at build time with `generateStaticParams` for blazing fast performance.
- **Catch-All Cuisine Routes (`/cuisines/[...slug]`)**: Multi-segment routing for hierarchical cuisines (e.g. `/cuisines/asian`, `/cuisines/mediterranean`).
- **Interactive Recipe Drafts (`/recipes/new`)**: Dynamic form allowing chefs to add, edit, and remove ingredient rows with draft state management.
- **Interactive Checklists**: Checkable ingredients and step completion tracking on recipe pages.
- **Loading & Error Boundaries**: Custom skeleton loaders (`loading.tsx`) and fallback (`not-found.tsx`).
- **Fully Responsive**: Mobile-first design styled with Tailwind CSS v4.
- **Zero External Dependencies**: Powered entirely by local typed mock datasets.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** | React Framework (App Router & Turbopack) |
| **React 19** | Modern UI components |
| **TypeScript 5** | Strict type safety and interface definitions |
| **Tailwind CSS 4** | Next-generation utility-first styling |

---

## Folder Structure

```text
recipe-explorer/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout with Header and Footer
│   │   ├── page.tsx                    # Landing / Catalog redirect
│   │   ├── loading.tsx                 # Skeleton loader
│   │   ├── not-found.tsx               # Custom 404 handler
│   │   ├── globals.css                 # Global Tailwind CSS directives
│   │   ├── about/
│   │   │   └── page.tsx                # About the culinary platform
│   │   ├── cuisines/
│   │   │   ├── page.tsx                # Cuisines index
│   │   │   └── [...slug]/
│   │   │       └── page.tsx            # Catch-all cuisine category page
│   │   └── recipes/
│   │       ├── page.tsx                # Recipe listing & explorer
│   │       ├── new/
│   │       │   └── page.tsx            # Interactive recipe draft creation
│   │       └── [id]/
│   │           └── page.tsx            # Static pre-rendered recipe detail (SSG)
│   ├── components/
│   │   ├── Header.tsx                  # Top navigation bar
│   │   ├── Footer.tsx                  # Application footer
│   │   ├── RecipeCatalog.tsx           # State wrapper for search & filters
│   │   ├── RecipeCard.tsx              # Recipe preview card
│   │   ├── RecipeGrid.tsx              # Grid container for cards
│   │   ├── CategoryFilter.tsx          # Cuisine filter pill buttons
│   │   ├── SearchInput.tsx             # Real-time search field
│   │   └── IngredientsList.tsx         # Interactive checklist for ingredients
│   ├── data/
│   │   └── recipes.ts                  # Typed dataset with 20+ recipes
│   └── types/
│       └── recipe.ts                   # Recipe, Ingredient, and Nutrition interfaces
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## Routing Strategy

| Route | Type | Description |
| :--- | :--- | :--- |
| `/` | Static | Redirects / showcases the featured recipe catalog |
| `/recipes` | Static (Client filter) | Filterable recipe catalog with search and difficulty filters |
| `/recipes/[id]` | SSG (`generateStaticParams`) | Pre-rendered individual recipe profile with instructions |
| `/recipes/new` | Client Dynamic | Interactive recipe creation form with dynamic row controls |
| `/cuisines` | Static | Overview of regional culinary traditions |
| `/cuisines/[...slug]` | Catch-All Route | Hierarchical route supporting single and nested cuisine paths |
| `/about` | Static | About the platform and culinary philosophy |

---

## Rendering Strategy

| Page | Rendering | Architecture Rationale |
| :--- | :--- | :--- |
| **Catalog (`/recipes`)** | SSR + Client | Client-side search and category filtering state |
| **Recipe Detail (`/recipes/[id]`)** | SSG (Static) | Pre-rendered using `generateStaticParams` for sub-millisecond loads |
| **Cuisine Routes (`/cuisines/[...slug]`)** | Server | Dynamic path resolution with static parameter generation |
| **New Recipe Form (`/recipes/new`)** | Client (`"use client"`) | Dynamic ingredient row updates, form validation, and state |
| **About & 404** | Static Server | Fast static content delivery |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) (or whichever port is assigned) in your browser.

---

## Key Concepts Demonstrated

- **Static Site Generation (SSG)**: Implementing `generateStaticParams` for compile-time rendering of dynamic routes.
- **Catch-All Routes**: `[...slug]` to support multi-depth hierarchical URL schemes.
- **Form State Management**: Managing dynamic array state in React 19 for multi-item ingredient lists.
- **Client & Server Component Separation**: Minimizing client JS bundle size by keeping heavy layout components on the server.
- **Tailwind CSS v4 Styling**: Clean layout patterns, badge tags, and responsive CSS grids.

---

## Author

**Trikam Devasi**  
* Email: [trikam.devasi.cg@outlook.com](mailto:trikam.devasi.cg@outlook.com)
