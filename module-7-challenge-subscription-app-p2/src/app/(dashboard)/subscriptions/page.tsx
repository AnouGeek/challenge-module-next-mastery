import { getMySubscriptions } from "@/app/dal/subscription-dal"
import { getConnectedUser } from "@/services/authentification/auth-service"

export default async function SubscriptionsPage() {
  const currentUser = await getConnectedUser()

  if (!currentUser) {
    return <p>Vous devez être connecté.</p>
  }

  const subscriptions = await getMySubscriptions(currentUser, currentUser.id)

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-2xl font-bold">Mes abonnements</h1>
      <ul className="flex flex-col gap-2">
        {subscriptions?.map((sub) => (
          <li key={sub.id} className="rounded-md border border-gray-200 p-3 text-sm">
            {sub.status} — {sub.amount / 100}€ — expire le {sub.endDate.toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}