import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProductForm from "@/components/ProductForm";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default async function Home() {
  // 1. On va chercher les données sur notre API externe
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  const products: Product[] = data.products;

  // 2. On affiche le résultat dans la console pour valider la plomberie
  console.log("Mon premier produit :", data.products[0]);

  // 3. On retourne l'interface (le HTML)
  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mon Catalogue</h1>

      <ProductForm />
      {/* On construira notre grille Shadcn ici juste après */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardTitle className="text-xl">{product.title}</CardTitle>
            </CardHeader>

            <CardContent className="grow">
              <p>{product.description}</p>
              <p>{product.price}</p>
            </CardContent>

            <CardFooter>
              <Button className="w-full">Ajouter au panier</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
