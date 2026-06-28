"use client"; // composant client car il gère un événement onClick

import { addToCart } from "@/lib/actions"; // Server Action — s'exécute sur le serveur
import { useOptimistic, useTransition } from "react";

type Props = {
  productId: number; // reçu depuis la page détail produit
};

export default function AddToCartButton({ productId }: Props) {
  // useTransition — permet de savoir si une action async est en cours
  // isPending = true pendant que addToCart s'exécute sur le serveur
  const [isPending, startTransition] = useTransition();

  // useOptimistic — affiche une valeur temporaire AVANT la réponse du serveur
  // "Ajouter au panier" = texte par défaut
  // () => "Ajouté !" = texte affiché instantanément pendant l'action
  const [optimisticText, setOptimisticText] = useOptimistic(
    "Ajouter au panier",
    () => "Ajouté !",
  );

  function handleClick() {
    startTransition(async () => {
      setOptimisticText("Ajouté !"); // affichage instantané côté client
      await addToCart(productId); // appel serveur en arrière-plan
      // quand le serveur répond → optimisticText revient à "Ajouter au panier"
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending} // désactivé pendant l'action pour éviter les double-clics
      className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
    >
      {optimisticText} {/* affiche le texte optimiste ou le texte par défaut */}
    </button>
  );
}
