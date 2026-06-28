import Image from "next/image";
import { getProduct } from "@/lib/products";
import { Product } from "@/types";
import OrderForm from "@/components/OrderForm";
import AddToCartButton from "@/components/AddToCartButton";

// Props typées — params est une Promise en Next.js 15
type Props = {
  params: Promise<{ id: string }>; // [id] dans le dossier = { id: string } ici
};

export default async function ProductPage({ params }: Props) {
  // On attend params pour extraire l'id — obligatoire en Next.js 15
  const { id } = await params;
  // id est un string ("1") — Number() le convertit en nombre (1)
  const product = await getProduct(Number(id));

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Image
        className="object-contain mb-6"
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
      />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-500 mb-4">{product.description}</p>
      <p className="text-2xl font-bold">{product.price} €</p>

      {/* Composant client — reçoit l'id du produit pour l'envoyer à addToCart */}
      <AddToCartButton productId={product.id} />

      {/* Formulaire de commande — gère sa propre logique via useActionState */}
      <OrderForm />
    </main>
  );
}
