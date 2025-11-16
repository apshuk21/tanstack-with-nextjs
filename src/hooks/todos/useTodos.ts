"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTodos } from "@/actions/todos";
import { ITodo } from "@/interfaces/todos";

// Query keys - centralized for consistency
export const todosKeys = {
  all: ["todos"] as const,
  lists: () => [...todosKeys.all, "list"] as const,
  list: (filters?: unknown) => [...todosKeys.lists(), { filters }] as const,
  details: () => [...todosKeys.all, "detail"] as const,
  detail: (id: string) => [...todosKeys.details(), id] as const,
};

/**
 * Custom hook to fetch all products using TanStack Query
 * @returns Query result with products data, loading state, and error
 */
export function useTodos() {
  return useQuery<ITodo, Error>({
    queryKey: todosKeys.lists(),
    queryFn: () => {
      return getAllTodos();
    },
    staleTime: 0.5 * 60 * 1000, // Consider data fresh for 30 seconds
    // gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
}
