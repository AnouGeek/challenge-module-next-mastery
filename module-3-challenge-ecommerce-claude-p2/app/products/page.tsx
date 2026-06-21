import { getProducts } from "@/lib/products";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div>
      <h1>Nos produits</h1>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <Link
            href={`/products/${product.id}`}
            className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
            key={product.id}
          >
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
            ></Image>
            <h2>{product.title}</h2>
            <p>{product.price} €</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
