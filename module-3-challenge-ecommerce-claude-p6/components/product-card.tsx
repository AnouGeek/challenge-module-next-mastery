import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent>
        <Badge variant="secondary">{product.category}</Badge>
        <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-card-foreground">
          {product.title}
        </h3>
      </CardContent>
      <CardFooter>
        <span className="text-lg font-semibold text-card-foreground">
          {priceFormatter.format(product.price)}
        </span>
      </CardFooter>
    </Card>
  );
}
