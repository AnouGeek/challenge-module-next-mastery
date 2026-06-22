import Image from "next/image";
import { getProduct } from "@/lib/products";
import { Product } from "@/types";
import OrderForm from "@/components/OrderForm";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(Number(id));

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Image
        className="object-contain mb-6"
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
      ></Image>
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-500 mb-4">{product.description}</p>
      <p className="text-2xl font-bold">{product.price} €</p>
      <AddToCartButton productId={product.id}/>
      <OrderForm />
    </main>
  );
}
