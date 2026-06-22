import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

// Route Handler — crée un endpoint REST sur notre serveur
// Le fichier s'appelle toujours route.ts
// On exporte une fonction avec le nom de la méthode HTTP : GET, POST, PUT, DELETE...
// Accessible via : GET http://localhost:3000/api/products
// Utile pour : apps mobiles, frontends séparés, webhooks (Stripe, GitHub...)
export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products); // retourne les données en JSON
}