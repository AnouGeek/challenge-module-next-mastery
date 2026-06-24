"use client";

import { addToCart } from "@/lib/actions";
import { useOptimistic, useTransition } from "react";
import { Button } from "./ui/button";

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
    <Button
      onClick={handleClick}
      disabled={isPending}
      className="w-full mt-4 mb-24"
    >
      {optimisticText}
    </Button>
  );
}
