import { getMySubscriptions } from "@/app/dal/subscription-dal";
import { getConnectedUser } from "@/services/authentification/auth-service";

export default async function SubscriptionsPage() {
  // Récupère l'utilisateur connecté (version simulée pour ce challenge)
  const currentUser = await getConnectedUser();

  if (!currentUser) {
    return <p>Vous devez être connecté.</p>;
  }

  // On demande SES PROPRES abonnements : currentUser.id des deux côtés
  // (currentUser = celui qui demande, currentUser.id = celui dont on veut voir les abonnements)
  const subscriptions = await getMySubscriptions(currentUser, currentUser.id);

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