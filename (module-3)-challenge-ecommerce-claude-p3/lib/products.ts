import { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json()
  return data
}

export async function getProduct(id: number): Promise<Product> {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await response.json()
    return data
}
