"use client";
import { submitOrder, OrderState } from "@/lib/actions";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const initialState: OrderState = {};

export default function OrderForm() {
  const [state, formAction] = useActionState(submitOrder, initialState);

  if (state.success) {
    return <p className="text-green-700 text-5xl">La commande a été validée</p>;
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          name="name"
          placeholder="Jean Dupont"
          aria-invalid={Boolean(state.errors?.name)}
        />
        {state.errors?.name && (
          <p className="text-sm text-destructive">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="jean.dupont@exemple.com"
          aria-invalid={Boolean(state.errors?.email)}
        />
        {state.errors?.email && (
          <p className="text-sm text-destructive">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          name="address"
          placeholder="12 rue de la Paix, 75002 Paris"
          aria-invalid={Boolean(state.errors?.address)}
        />
        {state.errors?.address && (
          <p className="text-sm text-destructive">{state.errors.address[0]}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Commander
      </Button>
    </form>
  );
}
