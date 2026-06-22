import { getProducts } from "@/lib/products";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

// Composant async = React Server Component (RSC)
// Pas besoin de useEffect pour fetch — Next.js gère le fetch côté serveur directement
export default async function ProductsPage() {
  // await directement dans le composant — possible grâce au RSC
  const products = await getProducts();

  return (
    <div>
      <h1>Nos produits</h1>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product: Product) => (
          // Link = navigation côté client sans rechargement de page
          // key={product.id} = obligatoire pour que React identifie chaque élément
          <Link
            href={`/products/${product.id}`} // → /products/1, /products/2...
            className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
            key={product.id}
          >
            {/* Image de Next.js — optimise automatiquement les images */}
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
            />
            <h2>{product.title}</h2>
            <p>{product.price} €</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
