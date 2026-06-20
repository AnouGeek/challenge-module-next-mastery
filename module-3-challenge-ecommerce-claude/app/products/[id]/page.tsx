import { getProduct } from "@/lib/products";
import { Product } from "@/types";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import OrderForm from "@/components/OrderForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product: Product = await getProduct(Number(id));

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="object-contain mb-6"
      />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-500 mb-4">{product.description}</p>
      <p className="text-2xl font-bold">{product.price} €</p>
      <AddToCartButton productId={product.id} />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Passer une commande</h2>
        <OrderForm />
      </div>
    </main>
  );
}
