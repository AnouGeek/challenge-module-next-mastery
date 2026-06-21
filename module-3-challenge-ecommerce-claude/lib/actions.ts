"use server"; // Tout ce fichier s'exécute uniquement sur le serveur

import { revalidatePath } from "next/cache";
import { z } from "zod";

// Type partagé : toutes les formes possibles de l'état du formulaire
export type OrderState = {
  errors?: {
    name?: string[];
    email?: string[];
    address?: string[];
  };
  success?: boolean;
};

// Schéma Zod : on définit les règles de validation
const orderSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.email("Email invalide"), // Zod v4 : z.email() directement
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
});

// Server Action : ajout au panier
export async function addToCart(productId: number) {
  console.log(`Produit ${productId} ajouté au panier`);
  revalidatePath("/products"); // Revalide le cache de la page produits
}

// Server Action : soumission de commande

// prevState = état précédent (obligatoire avec useActionState)
// On retourne OrderState dans tous les cas
export async function submitOrder(
  prevState: OrderState,
  formData: FormData
): Promise<OrderState> {

  // On extrait les données brutes du formulaire
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    address: formData.get("address"),
  };

  // safeParse valide sans crasher : retourne success ou errors
  const result = orderSchema.safeParse(raw);

  if (!result.success) {
    // result.error contient toutes les erreurs Zod en vrac
    // treeifyError les organise en arbre par champ :
    // tree ressemble à ça :
    // {
    //   properties: {
    //     name: { errors: ["Le nom doit contenir au moins 2 caractères"] },
    //     email: { errors: ["Email invalide"] },
    //     address: { errors: ["..."] }
    //   }
    // }

    // Donc tree.properties?.name?.errors
    // = les erreurs du champ name
    // Le ?. c'est "si ça existe"
    const tree = z.treeifyError(result.error);
    return {
      errors: {
        name: tree.properties?.name?.errors,
        email: tree.properties?.email?.errors,
        address: tree.properties?.address?.errors,
      },
    };
  }

  // Validation réussie : ici on ferait un appel DB en vrai
  console.log("Commande validée :", result.data);
  return { success: true };
}