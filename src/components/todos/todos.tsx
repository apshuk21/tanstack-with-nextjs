"use client";

import { useTodos } from "@/hooks/todos/useTodos";

export function Todos() {
  const { data: todos, isLoading, error, isFetching } = useTodos();
  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isFetching) {
    return <div>Fetching Todos...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Todos</h2>
      {/* Add your products rendering logic here */}
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
}
