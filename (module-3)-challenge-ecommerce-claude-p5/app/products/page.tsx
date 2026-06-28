import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/products";
import { Product } from "@/types";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="grid grid-cols-4 gap-6 p-8">
      {products.map((product: Product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
