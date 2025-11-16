"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/actions/products";
import { IProduct } from "@/interfaces/products";

// Query keys - centralized for consistency
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters?: unknown) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

/**
 * Custom hook to fetch all products using TanStack Query
 * @returns Query result with products data, loading state, and error
 */
export function useProducts() {
  console.log("🔵 useProducts hook called");

  return useQuery<IProduct[], Error>({
    queryKey: productKeys.lists(),
    queryFn: () => {
      console.log("🟢 API call executing");
      return getAllProducts();
    },
    staleTime: 0.5 * 60 * 1000, // Consider data fresh for 30 seconds
    // gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
}
