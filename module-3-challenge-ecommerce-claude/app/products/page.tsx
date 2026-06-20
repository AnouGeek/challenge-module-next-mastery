import Image from "next/image";
import { getProducts } from "@/lib/products";
import { Product } from "@/types";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Nos produits</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="border p-4 rounded-lg hover:shadow-lg transition">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="font-semibold text-sm mb-2">{product.title}</h2>
              <p className="text-lg font-bold">{product.price} €</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
