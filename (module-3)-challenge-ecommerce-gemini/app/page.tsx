import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {ProductForm} from "@/components/ProductForm";
import { getProducts } from "@/actions/product.action";

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

  // On demande au serveur de nous donner les produits
  const mockProducts = await getProducts();

  // 3. On retourne l'interface (le HTML)
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Mon Mini E-commerce</h1>
      
      {/* Notre super formulaire */}
      <ProductForm />

      {/* La vitrine des produits */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Catalogue des produits ({mockProducts.length})</h2>
        
        {mockProducts.length === 0 ? (
          <p className="text-gray-500">Aucun produit pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* On boucle sur notre base de données pour afficher chaque produit */}
            {mockProducts.map((product) => (
              <div key={product.id} className="p-4 border rounded-lg shadow-sm bg-white">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-blue-600 font-bold mt-2">{product.price.toFixed(2)} €</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
