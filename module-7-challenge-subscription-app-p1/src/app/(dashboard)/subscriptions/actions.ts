"use server";

// Server Action = la porte d'entrée pour une MUTATION (créer, ici).
// Contrairement au DAL (lecture), pas de cache, pas de DTO ici — juste
// validation du formulaire + appel au Service + revalidation de la page.

import { z } from "zod";
import { createSubscriptionService } from "@/services/subscription-service";
import { revalidatePath } from "next/cache";

// Schéma Zod pour le FORMULAIRE — différent du schéma Zod du Service.
// Ici on valide ce qui arrive du formulaire HTML (souvent des strings brutes).
const createSubscriptionFormSchema = z.object({
  userId: z.uuid(),
  amount: z.string().transform((val) => parseFloat(val)), // le formulaire envoie une string, on la convertit en nombre
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
  // 1. On récupère les données brutes du formulaire
  const rawData = Object.fromEntries(formData);

  // 2. Validation Zod côté formulaire (forme uniquement)
  const parsed = createSubscriptionFormSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: "Erreur de validation du formulaire" };
  }

  try {
    // 3. On appelle le SERVICE — c'est LUI qui refera sa propre validation Zod
    //    (plus stricte, avec le .refine() sur les dates) + la règle métier
    //    (pas 2 abonnements actifs). La Server Action ne fait JAMAIS confiance
    //    aveuglément au formulaire, même déjà validé une fois.
    await createSubscriptionService(parsed.data);
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }

  // 4. On dit à Next.js que la page /subscriptions a des données périmées,
  //    qu'il faut la régénérer avec les nouvelles données
  revalidatePath("/subscriptions");

  return { success: true, message: "Abonnement créé avec succès" };
}
