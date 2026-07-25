"use server";

import { createSubscriptionService } from "@/services/subscription-service";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const SubscriptionSchema = z.object({
  userId: z.uuid(),
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
  const rawData = Object.fromEntries(formData);
  const parsed = SubscriptionSchema.safeParse(rawData);

  if (!parsed.success) {
    return { success: false, message: "Erreur de validation du formulaire" };
  }

  try {
    await createSubscriptionService(parsed.data);
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
  revalidatePath("/subscriptions");
  return { success: true, message: "Abonnement créé avec succés" };
}
