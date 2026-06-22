"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type OrderState = {
  errors?: {
    name?: string[];
    email?: string[];
    address?: string[];
  };
  success?: boolean;
};

const orderSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.email("Email invalide"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
});

export async function addToCart(productId: number) {
  console.log(`Product ${productId} a été ajouté au panier`);
  revalidatePath("/products");
}

export async function submitOrder(
  prevState: OrderState,
  formData: FormData,
): Promise<OrderState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    address: formData.get("address"),
  };

  const result = orderSchema.safeParse(raw);

  if (!result.success) {
    const tree = z.treeifyError(result.error);
    return {
      errors: {
        name: tree.properties?.name?.errors,
        email: tree.properties?.email?.errors,
        address: tree.properties?.address?.errors,
      },
    };
  }

  console.log("Commande validée", result.data);
  return { success: true };
}
