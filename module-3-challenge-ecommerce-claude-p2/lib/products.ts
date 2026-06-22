import { Product } from "@/types";

// Récupère TOUS les produits depuis l'API externe
// Promise<Product[]> = cette fonction retourne une promesse qui contient un tableau de produits
export async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json(); // convertit la réponse en objet JS
  return data;
}

// Récupère UN seul produit par son id
// Promise<Product> = retourne une promesse qui contient un seul produit
export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await response.json();
  return data;
}
