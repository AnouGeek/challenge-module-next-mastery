import Image from "next/image";
import { getProduct } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AddToCartButton from "@/components/AddToCartButton";
import OrderForm from "@/components/OrderForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(Number(id));

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="object-contain mb-6"
      />
      {/* Badge pour la catégorie */}
      <Badge className="mb-2">{product.category}</Badge>
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-500 mb-4">{product.description}</p>
      <p className="text-2xl font-bold mb-4">{product.price} €</p>
      {/* Separator = ligne de séparation shadcn */}
      <Separator className="mb-4" />
      <AddToCartButton productId={product.id} />
      <Separator className="my-8" />
      <OrderForm />
    </main>
  );
}
