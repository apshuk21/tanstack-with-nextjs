"use client";

import Link from "next/link";
import { useProducts } from "@/hooks/products/useProducts";
import { Product } from "@/components/product/product";
import { IProduct } from "@/interfaces/products";

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

  const items: IProduct[] = Array.isArray(products)
    ? products
    : products
    ? [products]
    : [];

  return (
    <div>
      {/* <h2 className="text-2xl font-semibold text-gray-900 mb-4">Products</h2> */}
      <ul className="space-y-3">
        {items.length > 0 ? (
          items.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                className="block hover:opacity-95"
              >
                <Product product={p} />
              </Link>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No products found.</li>
        )}
      </ul>
    </div>
  );
}
