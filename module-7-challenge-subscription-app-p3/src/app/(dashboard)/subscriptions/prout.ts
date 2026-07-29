"use server";

import { z } from "zod";
import { createSubscription } from "@/services/subscription-service";
import { getConnectedUser } from "@/services/authentification/auth-service";
import { revalidatePath } from "next/cache";

// userId retiré du schéma : il ne vient jamais du client
const createSubscriptionFormSchema = z.object({
  amount: z.string().transform((val) => parseFloat(val)),
  startDate: z.string().transform((val) => new Date(val)),
  endDate: z.string().transform((val) => new Date(val)),
});

export type FormState = {
  success: boolean;
  message: string;
};

export async function createSubscriptionAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const currentUser = await getConnectedUser();

  if (!currentUser) {
    return { success: false, message: "Non authentifié" };
  }

  const rawData = Object.fromEntries(formData);
  const parsed = createSubscriptionFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return { success: false, message: "Erreur de validation du formulaire" };
  }

  try {
    // Le service prend maintenant currentUser en premier paramètre.
    // Le userId vient du serveur, pas du formulaire.
    await createSubscription(currentUser, {
      ...parsed.data,
      userId: currentUser.id,
    });
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }

  revalidatePath("/subscriptions");

  return { success: true, message: "Abonnement créé avec succès" };
}