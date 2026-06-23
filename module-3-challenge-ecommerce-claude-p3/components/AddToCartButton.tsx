"use client";

import { addToCart } from "@/lib/actions";
import { useOptimistic, useTransition } from "react";

type Props = {
  productId: number;
};

export default function AddToCartButton({ productId }: Props) {
  const [isPending, startTransition] = useTransition();

  const [optimisticText, setOptimisticText] = useOptimistic(
    "Ajouter au panier",
    () => "Ajouté",
  );

  function handleClick() {
    startTransition(async () => {
      setOptimisticText("Ajouté");
      await addToCart(productId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
    >
      {optimisticText}
    </button>
  );
}
