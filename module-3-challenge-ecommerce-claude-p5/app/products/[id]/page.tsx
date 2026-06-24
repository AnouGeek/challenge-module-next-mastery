import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getProduct } from "@/lib/products";
import OrderForm from "@/components/order-form";
import AddToCartButton from "@/components/add-to-cart-button";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(Number(id));

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(product.price);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* Left: large product image */}
        <Card className="overflow-hidden p-0">
          <div className="relative aspect-square bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Card>

        {/* Right: product details */}
        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit">
            {product.category}
          </Badge>

          <h1 className="mt-4 text-pretty text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {product.title}
          </h1>

          <p className="mt-4 text-2xl font-semibold">{formattedPrice}</p>

          <p className="mt-6 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <AddToCartButton productId={product.id} />
        </div>
      </div>

      <OrderForm />
    </main>
  );
}
