"use client";

import { useActionState } from "react";
import { submitOrder, type OrderState } from "@/lib/actions";

// État initial vide — même type que ce que retourne submitOrder
const initialState: OrderState = {};

export default function OrderForm() {
  // useActionState connecte submitOrder à l'état du composant
  // state = dernier retour de submitOrder (errors ou success)
  // formAction = fonction à passer au formulaire
  const [state, formAction] = useActionState(submitOrder, initialState);

  // Si succès, on affiche un message à la place du formulaire
  if (state.success) {
    return <p className="text-green-600 font-semibold">Commande envoyée avec succès !</p>;
  }

  return (
    // action={formAction} remplace onSubmit — Next.js envoie le FormData à la Server Action
    <form action={formAction} className="flex flex-col gap-4 max-w-md">

      <div>
        <label className="text-sm font-medium">Nom</label>
        {/* name="name" correspond à formData.get("name") dans la Server Action */}
        <input name="name" className="border rounded p-2 w-full" />
        {/* Affiche l'erreur Zod si le champ est invalide */}
        {state.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <input name="email" type="email" className="border rounded p-2 w-full" />
        {state.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Adresse</label>
        <input name="address" className="border rounded p-2 w-full" />
        {state.errors?.address && (
          <p className="text-red-500 text-sm">{state.errors.address[0]}</p>
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