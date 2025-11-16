# TanStack Query Best Practices with Next.js Server Actions

## Important Discovery: Preventing Duplicate Network Calls

### Issue

When using **Next.js Server Actions** with **TanStack Query**, passing the server action function directly as a reference to `queryFn` can result in **duplicate network calls**, especially:
- During React Strict Mode (development)
- When data becomes stale
- On window focus refetches
- On component remounts

### The Problem

```tsx
// ❌ PROBLEMATIC - May cause duplicate network calls
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,  // Direct function reference
  });
}
```

**Result:** 2 identical network calls with the same request payload

### The Solution

```tsx
// ✅ CORRECT - Single network call (deduplication works)
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),  // Wrapped in arrow function
  });
}
```

**Result:** Only 1 network call, even in React Strict Mode

---

## Why This Happens

### TanStack Query's Request Deduplication

TanStack Query has built-in request deduplication that:
- Detects when multiple queries with the same `queryKey` are triggered simultaneously
- Executes the `queryFn` only once
- Shares the result across all subscribers
- Prevents redundant network requests

### Server Actions Behavior

When a Next.js Server Action is passed directly as a function reference:
- The function identity might change across renders or mounts
- TanStack Query's deduplication mechanism may not recognize them as identical requests
- React Strict Mode's double-mounting can trigger separate network calls

### Arrow Function Wrapper Solution

Wrapping the server action in an arrow function:
- Gives TanStack Query full control over function execution
- Ensures deduplication logic works correctly
- Maintains function identity across renders
- Works properly with React Strict Mode

---

## Best Practices

### 1. Always Wrap Server Actions

```tsx
// ✅ Simple call
queryFn: () => getAllProducts()

// ✅ With parameters
queryFn: () => getProductById(productId)

// ✅ With error handling
queryFn: async () => {
  try {
    return await getAllProducts();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

// ✅ With logging (for debugging)
queryFn: () => {
  console.log('🟢 Fetching products...');
  return getAllProducts();
}
```

### 2. Complete Hook Example

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/actions/products";
import { IProduct } from "@/interfaces/products";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
};

export function useProducts() {
  return useQuery<IProduct, Error>({
    queryKey: productKeys.lists(),
    queryFn: () => getAllProducts(),  // ✅ Arrow function wrapper
    staleTime: 5 * 60 * 1000,
  });
}
```

### 3. With Dynamic Parameters

```tsx
export function useProduct(id: string) {
  return useQuery<IProduct, Error>({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),  // ✅ Closure over parameter
    enabled: !!id,  // Only run if id exists
  });
}
```

---

## Verification

### How to Test

Add logging to verify deduplication is working:

```tsx
export function useProducts() {
  console.log('🔵 useProducts hook called');

  return useQuery<IProduct, Error>({
    queryKey: productKeys.lists(),
    queryFn: () => {
      console.log('🟢 API call executing');
      return getAllProducts();
    },
  });
}
```

### Expected Console Output (Development with Strict Mode)

```
🔵 useProducts hook called
🔵 useProducts hook called  ← Strict Mode double mount
🟢 API call executing       ← Only executes ONCE! ✅
```

### Network Tab

- **Before fix:** 2 identical requests
- **After fix:** 1 request (deduplication working)

---

## Additional Benefits

### Performance
- Reduces unnecessary network traffic
- Decreases server load
- Improves response times

### User Experience
- Faster perceived performance
- Lower data usage
- More responsive UI

### Cost Efficiency
- Fewer API calls to your backend
- Reduced infrastructure costs
- Lower bandwidth usage

---

## Common Mistakes to Avoid

### ❌ Don't Do This

```tsx
// ❌ Direct reference to server action
queryFn: getAllProducts

// ❌ Binding without wrapper (still problematic)
queryFn: getAllProducts.bind(null)

// ❌ Creating inline server action (not marked "use server")
queryFn: async () => {
  "use server";  // This won't work correctly here
  return fetch('/api/products');
}
```

### ✅ Do This Instead

```tsx
// ✅ Arrow function wrapper
queryFn: () => getAllProducts()

// ✅ With async/await
queryFn: async () => await getAllProducts()

// ✅ With parameters from closure
queryFn: () => getProductById(productId)
```

---

## Related Configuration

### Provider Setup

```tsx
// src/components/providers/query-provider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Default: 1 minute
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### Query Keys Pattern

```tsx
// Centralized query keys for type safety
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters?: unknown) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};
```

---

## Summary

**Always wrap Next.js Server Actions in arrow functions when using them with TanStack Query's `queryFn`.**

This ensures:
- ✅ Proper request deduplication
- ✅ Single network call per query
- ✅ Optimal performance
- ✅ Better user experience

---

## References

- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [React Strict Mode](https://react.dev/reference/react/StrictMode)

---

**Last Updated:** 2025-11-16
**Project:** tanstack-complete
