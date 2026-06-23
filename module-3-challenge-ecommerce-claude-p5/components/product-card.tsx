import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types"

export function ProductCard({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(product.price)

  return (
    <Card className="group overflow-hidden pt-0 transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent>
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
        <h3 className="line-clamp-2 text-sm font-medium leading-relaxed text-pretty">
          {product.title}
        </h3>
      </CardContent>
      <CardFooter className="mt-auto">
        <span className="text-lg font-semibold">{formattedPrice}</span>
      </CardFooter>
    </Card>
  )
}
