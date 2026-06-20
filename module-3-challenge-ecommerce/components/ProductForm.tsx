"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createProduct } from "@/actions/product.action";

// 1. Schéma Zod
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit faire au moins 2 caractères.",
  }),
  price: z.coerce.number().positive({
    message: "Le prix doit être supérieur à 0",
  }),
});

export function ProductForm() {
  // 2. Initialisation du formulaire
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
    },
  });

  // 3. Soumission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("1. Données validées par le client :", values);

    // On envoie les données dans notre tuyau sécurisé vers le serveur
    const response = await createProduct(values);

    // On écoute la réponse qui revient du serveur
    if (response.success) {
      console.log("2. Réponse du serveur :", response.message);
      
      // Bonus : on vide le formulaire une fois que c'est sauvegardé !
      form.reset(); 
    }
  }

  // 4. L'enveloppe
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-lg shadow-sm border mb-12"
      >
        <h2 className="text-xl font-bold">Ajouter un produit</h2>

        {/* --- CHAMP TITRE --- */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Montre minimaliste" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* --- CHAMP PRIX --- */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix unitaire (€)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Ex: 49.99"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- BOUTON DE SOUMISSION --- */}
        <Button type="submit">Créer le produit</Button>

      </form> {/* <--- LA BALISE EST DÉSORMAIS FERMÉE AU BON ENDROIT, APRÈS LE BOUTON */}
    </Form>
  );
}