"use client";

import { useOptimistic, useTransition } from "react";
import { addToCart } from "@/lib/actions";

type Props = {
  productId: number;
};

export default function AddToCartButton({ productId }: Props) {
  // useTransition permet de savoir si une action est en cours
  const [isPending, startTransition] = useTransition();

  // useOptimistic affiche une valeur temporaire pendant que le serveur répond
  // "Ajouté !" s'affiche instantanément, avant même la réponse du serveur
  const [optimisticText, setOptimisticText] = useOptimistic(
    "Ajouter au panier", // valeur par défaut
    () => "Ajouté !" // valeur optimiste pendant l'action
  );

  function handleClick() {
    startTransition(async () => {
      // On affiche "Ajouté !" instantanément sans attendre le serveur
      setOptimisticText("Ajouté !");
      // Pendant ce temps, la Server Action s'exécute en arrière-plan
      await addToCart(productId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending} // Désactive le bouton pendant l'action
      className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
    >
      {/* Affiche le texte optimiste ou le texte par défaut */}
      {optimisticText}
    </button>
  );
}