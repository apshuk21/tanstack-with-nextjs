"use client";

import { useProducts } from "@/hooks/products/useProducts";

export function Products() {
  const { data: products, isLoading, error, isFetching } = useProducts();

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isFetching) {
    return <div>Fetching Products...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      {/* Add your products rendering logic here */}
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
