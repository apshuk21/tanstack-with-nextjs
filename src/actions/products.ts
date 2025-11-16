"use server";

import { IProduct } from "@/interfaces/products";

const BASE_URL = "http://localhost:4000";

export async function getAllProducts(): Promise<IProduct> {
  const response = await fetch(`${BASE_URL}/products`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch products");
  }

  const products = await response.json();

  return products;
}
