"use client";

import { submitOrder, OrderState } from "@/lib/actions";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const initialState: OrderState = {};
export default function OrderForm() {
  const [state, formAction] = useActionState(submitOrder, initialState);

  if (state.success) {
    return <p>Commande validée !</p>;
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md mt-8">
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Nom</Label>
        <Input id="name" name="name" placeholder="John Doe" />
        {state.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@gmail.com"
        />
        {state.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="address">Adresse</Label>
        <Input id="address" name="address" placeholder="10 rue de Paris" />
        {state.errors?.address && (
          <p className="text-red-500 text-sm">{state.errors.address[0]}</p>
        )}
      </div>

      <Button type="submit">Commander</Button>
    </form>
  );
}
