"use client";

import { submitOrder, OrderState } from "@/lib/actions";
import { useActionState } from "react";

const initialState: OrderState = {};

export default function OrderForm() {
  const [state, formAction] = useActionState(submitOrder, initialState);

  if (state.success) {
    return <p className="text-green-600 font-semibold">Commande envoyée</p>;
  }
  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md mt-10">
      <label className="text-sm font-medium">Name</label>
      <input className="border rounded p-2 w-full" name="name" />
      {state.errors?.name && (
        <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
      )}
      <label className="text-sm font-medium">email</label>
      <input className="border rounded p-2 w-full" name="email" type="email" />
      {state.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
      )}
      <label className="text-sm font-medium">adresse</label>
      <input className="border rounded p-2 w-full" name="address" />
      {state.errors?.address && (
        <p className="text-red-500 text-sm">{state.errors.address[0]}</p>
      )}
      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
      >
        Soumettre le formulaire
      </button>
    </form>
  );
}
