# TanStack Query with Next.js

A comprehensive demonstration of integrating [TanStack Query](https://tanstack.com/query) (formerly React Query) with [Next.js 16](https://nextjs.org) App Router, showcasing modern data fetching patterns using Server Actions.

> **Work in Progress**: This project currently demonstrates data fetching (read operations). CRUD operations (create, update, delete) will be added in future updates.

## Features

### Current Implementation

- **Data Fetching with TanStack Query**: Efficient server-side data fetching using TanStack Query
- **Next.js Server Actions**: Leveraging Server Actions for secure backend operations
- **Products Management**: Browse products list and view individual product details
- **Todos Management**: Browse todos list and view individual todo details
- **Type Safety**: Full TypeScript support throughout the application
- **Modern UI**: Styled with Tailwind CSS

### Coming Soon

- Create new products and todos
- Update existing items
- Delete functionality
- Optimistic updates with TanStack Query mutations
- Error handling and loading states

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Runtime**: React 19

## REST API

This project connects to a REST API backend for data operations.

**API Repository**: (https://github.com/apshuk21/express-products-todos-server)

The API should be running on `http://localhost:4000` with the following endpoints:

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `GET /todos` - Fetch all todos
- `GET /todos/:id` - Fetch single todo

## Getting Started

### Prerequisites

- Node.js 20+ installed
- REST API server running on `http://localhost:4000`

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tanstack-complete
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Ensure your REST API is running on `http://localhost:4000`

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── actions/          # Server Actions for data fetching
│   ├── products.ts
│   └── todos.ts
├── app/              # Next.js App Router pages
│   ├── products/     # Products listing and detail pages
│   ├── todos/        # Todos listing and detail pages
│   └── layout.tsx
├── components/       # React components
│   ├── header/
│   ├── products/
│   ├── todos/
│   └── providers/    # TanStack Query provider
├── hooks/            # Custom React hooks with TanStack Query
│   ├── products/
│   └── todos/
└── interfaces/       # TypeScript interfaces
    ├── products.ts
    └── todos.ts
```

## Key Concepts Demonstrated

### Server Actions with TanStack Query

This project showcases how to use Next.js Server Actions as the data fetching layer for TanStack Query, combining the benefits of both:

- Server-side data fetching with Server Actions
- Client-side caching and state management with TanStack Query
- Type-safe API calls with TypeScript

### Example Usage

```typescript
// Server Action (src/actions/products.ts)
"use server";

export async function getAllProducts(): Promise<IProduct[]> {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
}

// Custom Hook (src/hooks/products/useProducts.ts)
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
}
```

## Learn More

- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

This project is open source and available under the MIT License.
