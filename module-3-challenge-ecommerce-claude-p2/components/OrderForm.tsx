"use client";

import { OrderState, submitOrder } from "@/lib/actions";
import { useActionState } from "react";

const initialState: OrderState = {};

export default function OrderForm() {
  const [state, formAction] = useActionState(submitOrder, initialState);

  if (state.success) {
    return (
      <p className="text-green-600 font-semibold">
        Commande envoyée avec succés !
      </p>
    );
  }
  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md mt-10">
      <div>
        <label className="text-sm font-medium">Nom</label>
        <input name="name" className="border rounded p-2 w-full" />
        {state.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          className="border rounded p-2 w-full"
        />
        {state.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Adresse</label>
        <input name="address" className="border rounded p-2 w-full" />
        {state.errors?.address && (
          <p className="text-red-500 text-sm">{state.errors?.address[0]}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
      >
        Commander
      </button>
    </form>
  );
}
