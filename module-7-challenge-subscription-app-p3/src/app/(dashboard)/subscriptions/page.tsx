import { getMySubscriptions } from "@/app/dal/subscription-dal";

export default async function SubscriptionsPage() {
  const subscriptions = await getMySubscriptions();

  return (
    <div>
      <h1>Mes abonnements</h1>
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.id}>
            {sub.status} — {sub.amount / 100}€ — expire le{" "}
            {sub.endDate.toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}