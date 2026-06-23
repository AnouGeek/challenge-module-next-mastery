import Image from "next/image";
import { Product } from "@/types";
import { getProducts } from "@/lib/products";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="grid grid-cols-4 gap-6 p-8">
      {products.map((product: Product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          {/* Card = composant shadcn — remplace notre div avec border */}
          <Card className="hover:shadow-lg transition h-full">
            <CardContent className="pt-4">
              <Image
                src={product.image}
                alt={product.title}
                height={200}
                width={200}
                className="w-full h-48 object-contain"
              />
              {/* Badge = étiquette pour la catégorie */}
              <Badge className="mt-2">{product.category}</Badge>
              <h2 className="font-semibold text-sm mt-2 line-clamp-2">
                {product.title}
              </h2>
            </CardContent>
            {/* CardFooter = bas de la carte */}
            <CardFooter>
              <p className="font-bold">{product.price} €</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
