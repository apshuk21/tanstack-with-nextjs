"use server";

import { IProduct } from "@/interfaces/products";

const BASE_URL = "http://localhost:4000";

export async function getAllProducts(): Promise<IProduct[]> {
  let products = [];
  const response = await fetch(`${BASE_URL}/products`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch products");
  }

  products = await response.json();

  return products;
}

export async function getProductBySlug(slug: string): Promise<IProduct> {
  const response = await fetch(`${BASE_URL}/products/${slug}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch product by slug");
  }

  const product = await response.json();

  return product;
}
