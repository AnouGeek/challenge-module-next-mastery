"use server"; // ⚠️ INDISPENSABLE : Dit à Next.js que ce fichier ne doit jamais fuiter côté navigateur
import { revalidatePath } from "next/cache";

// Fausse base de données en mémoire (uniquement accessible côté serveur)
const mockProducts = [
  { id: "1", title: "Montre Minimaliste", price: 49.99 },
  { id: "2", title: "Sac à dos Urbain", price: 79.50 },
];

// 2. ✅ On exporte une fonction ASYNC pour donner le droit de lire les produits
export async function getProducts() {
  return mockProducts;
}

// On crée notre fonction asynchrone qui recevra les données du formulaire
export async function createProduct(formData: { title: string; price: number }) {
  console.log("🔥 Action déclenchée sur le SERVEUR avec :", formData);

  // On simule le temps d'écriture (1 seconde)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 1. On fabrique notre nouveau produit avec un faux ID aléatoire
  const newProduct = {
    id: Math.random().toString(36).substring(7),
    title: formData.title,
    price: formData.price,
  };

  // 2. On l'ajoute (push) dans notre base de données
  mockProducts.push(newProduct);
  console.log("📦 Nouvelle base de données :", mockProducts);

  // 3. LA MAGIE NEXT.JS : On ordonne au serveur de vider son cache et de rafraîchir la page d'accueil ("/")
  revalidatePath("/");

  return { 
    success: true, 
    message: "Le produit a bien été sauvegardé !" 
  };
}