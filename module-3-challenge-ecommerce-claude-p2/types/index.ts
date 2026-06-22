// On définit la forme d'un produit pour TypeScript
// Partout où on utilise un produit, TypeScript vérifie que ces champs existent
export type Product = {
  id: number; // identifiant unique du produit
  title: string; // nom du produit
  price: number; // prix en nombre (ex: 29.99)
  description: string;
  image: string; // URL de l'image
  category: string;
};
