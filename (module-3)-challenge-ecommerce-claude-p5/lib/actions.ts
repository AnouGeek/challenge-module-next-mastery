"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

export type OrderState = {
  errors?: {
    name?: string[];
    email?: string[];
    address?: string[];
  };
  success?: boolean;
};

const schemaOrder = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caratères"),
  email: z.email("Email invalide"),
  address: z.string().min(5, "Le nom doit contenir au moins 5 caratères"),
});

export async function addToCart(productId: number) {
  console.log(`Product ${productId} a été ajouté au panier`);
  revalidatePath("/products");
}

export async function submitOrder(
  prevState: OrderState,
  formdata: FormData,
): Promise<OrderState> {
  const raw = {
    name: formdata.get("name"),
    email: formdata.get("email"),
    address: formdata.get("address"),
  };

  const result = schemaOrder.safeParse(raw);

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

  console.log("Commande passée", result.data);
  return { success: true };
}
