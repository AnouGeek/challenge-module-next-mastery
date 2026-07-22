// src/app/(dashboard)/subscriptions/new/page.tsx

'use client'

import { useActionState } from 'react'
import { createSubscriptionAction, type FormState } from '../actions'

const initialState: FormState = { success: false, message: '' }

export default function NewSubscriptionPage() {
  const [state, formAction] = useActionState(createSubscriptionAction, initialState)

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-2xl font-bold">Créer un abonnement</h1>

      <form action={formAction} className="flex flex-col gap-4">
        {/* IMPORTANT : chaque "name" doit correspondre EXACTEMENT
            aux clés attendues par createSubscriptionFormSchema dans actions.ts */}

        <div className="flex flex-col gap-1">
          <label htmlFor="userId" className="text-sm font-medium text-gray-700">
            User ID
          </label>
          <input
            id="userId"
            type="text"
            name="userId"
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="amount" className="text-sm font-medium text-gray-700">
            Montant (en centimes, ex: 1999 pour 19,99€)
          </label>
          <input
            id="amount"
            type="text"
            name="amount"
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="startDate" className="text-sm font-medium text-gray-700">
            Date de début
          </label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="endDate" className="text-sm font-medium text-gray-700">
            Date de fin
          </label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Créer l&apos;abonnement
        </button>
      </form>

      {state.message && (
        <p
          className={`mt-4 rounded-md p-3 text-sm ${
            state.success
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  )
}