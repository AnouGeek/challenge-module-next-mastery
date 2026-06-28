"use server"; // tout ce fichier s'exécute UNIQUEMENT sur le serveur, jamais dans le navigateur

import { revalidatePath } from "next/cache";
import { z } from "zod";

// Type exporté car OrderForm.tsx en a besoin pour typer useActionState
// Tous les champs sont optionnels (?) car l'état peut être :
// {} au départ / { errors } si invalide / { success: true } si valide
export type OrderState = {
  errors?: {
    name?: string[];    // tableau de messages d'erreur pour ce champ
    email?: string[];   // optionnel car le champ peut être valide = pas d'erreur
    address?: string[];
  };
  success?: boolean;
};

// Les règles de validation — Zod vérifiera que les données respectent ça
const orderSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.email("Email invalide"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
});

// Server Action — s'exécute sur le serveur quand on clique "Ajouter au panier"
export async function addToCart(productId: number) {
  console.log(`Product ${productId} a été ajouté au panier`); // visible dans le terminal VS Code
  revalidatePath("/products"); // revalide le cache de la page produits après l'ajout
}

// Server Action — appelée par useActionState dans OrderForm.tsx
// prevState = état précédent, obligatoire avec useActionState (même si on l'utilise pas)
// formData = les données brutes du formulaire HTML envoyées automatiquement par le navigateur
export async function submitOrder(
  prevState: OrderState,
  formData: FormData,
): Promise<OrderState> { // retourne toujours un OrderState

  // On extrait les valeurs du formulaire
  // FormData n'est pas lisible par Zod directement, on crée un objet JS normal
  const raw = {
    name: formData.get("name"),       // correspond à <input name="name" />
    email: formData.get("email"),     // correspond à <input name="email" />
    address: formData.get("address"), // correspond à <input name="address" />
  };

  // safeParse vérifie raw contre le schéma SANS crasher si invalide
  // parse() crasherait l'app — safeParse retourne { success, data } ou { success, error }
  const result = orderSchema.safeParse(raw);

  if (!result.success) { // "si la validation a échoué"
    // treeifyError organise les erreurs Zod par champ
    // Sans ça les erreurs sont en vrac et difficiles à utiliser
    const tree = z.treeifyError(result.error);
    return {
      errors: {
        // ?. = "si ça existe" — évite un crash si pas d'erreur sur ce champ
        name: tree.properties?.name?.errors,
        email: tree.properties?.email?.errors,
        address: tree.properties?.address?.errors,
      },
    };
    // Ce return est reçu par useActionState → state.errors dans OrderForm.tsx
  }

  // Si on arrive ici, toutes les données sont valides
  // En vrai projet : sauvegarder en BDD, envoyer email de confirmation...
  console.log("Commande validée", result.data);
  return { success: true };
  // Ce return est reçu par useActionState → state.success dans OrderForm.tsx
}