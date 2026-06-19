"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//Schéma zod
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit faire au moins 2 caractères.",
  }),
  price: z.coerce.number().positive({
    message: "Le prix doit être supérieur à 0",
  }),
});

export default function ProductForm() {
  // 2. Initialisation du formulaire
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // On connecte RHF avec notre videur Zod
    defaultValues: {
      title: "",
      price: 0,
    },
  });

  // 3. La fonction exécutée SI ET SEULEMENT SI Zod valide tout
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Données validées par le client :", values);
    // On connectera notre Server Action ici plus tard
  }

  return <div></div>;
}

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// // 1. Le "Videur" (Zod Schema) : On définit les règles strictes
// const formSchema = z.object({
//   title: z.string().min(2, {
//     message: "Le titre doit faire au moins 2 caractères.",
//   }),
//   price: z.coerce.number().positive({
//     message: "Le prix doit être supérieur à 0.",
//   }), // coerce force la conversion du texte de l'input en nombre
// });

// export function ProductForm() {
//   // 2. Initialisation du formulaire (la plomberie React Hook Form)
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema), // On connecte RHF avec notre videur Zod
//     defaultValues: {
//       title: "",
//       price: 0,
//     },
//   });

//   // 3. La fonction exécutée SI ET SEULEMENT SI le videur Zod valide tout
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log("Données validées par le client :", values);
//     // On connectera notre Server Action ici à l'étape suivante !
//   }

//   // 4. L'interface (HTML + Tailwind + Shadcn)
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-6 bg-white p-6 rounded-lg shadow-sm border mb-12"
//       >
//         <h2 className="text-xl font-bold">Ajouter un produit</h2>

//         {/* Champ Titre */}
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nom du produit</FormLabel>
//               <FormControl>
//                 <Input placeholder="Ex: Montre minimaliste" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Champ Prix */}
//         <FormField
//           control={form.control}
//           name="price"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Prix unitaire (€)</FormLabel>
//               <FormControl>
//                 <Input type="number" step="0.01" placeholder="Ex: 49.99" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit">Créer le produit</Button>
//       </form>
//     </Form>
//   );
// }
