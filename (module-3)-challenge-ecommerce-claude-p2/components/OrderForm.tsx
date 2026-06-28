"use client"; // composant client car useActionState est un hook React

// OrderState = type du retour de submitOrder (errors ou success)
// submitOrder = la Server Action qui valide et traite la commande
import { OrderState, submitOrder } from "@/lib/actions";
import { useActionState } from "react";

// État initial vide — même type que ce que retourne submitOrder
// Au départ : pas d'erreurs, pas de succès
const initialState: OrderState = {};

export default function OrderForm() {
  // useActionState fait 3 choses :
  // 1. Lie submitOrder au formulaire
  // 2. Garde en mémoire le dernier retour de submitOrder dans state
  // 3. Crée formAction à passer à <form action={}>
  const [state, formAction] = useActionState(submitOrder, initialState);

  // Si submitOrder a retourné { success: true }
  // on remplace le formulaire par un message de succès
  if (state.success) {
    return (
      <p className="text-green-600 font-semibold">
        Commande envoyée avec succès !
      </p>
    );
  }

  return (
    // action={formAction} remplace onSubmit
    // Next.js collecte automatiquement les inputs et envoie le FormData à submitOrder
    <form action={formAction} className="flex flex-col gap-4 max-w-md mt-10">
      <div>
        <label className="text-sm font-medium">Nom</label>
        {/* name="name" → formData.get("name") dans submitOrder */}
        <input name="name" className="border rounded p-2 w-full" />
        {/* state.errors?.name = "si errors existe ET name existe" */}
        {state.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
          // [0] = premier message d'erreur du tableau
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
