import { ReactNode } from "react";

export default function GalleryLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className="relative p-10 max-w-4xl mx-auto min-h-screen">
      {/* On affiche le contenu normal */}
      {children}
      {/* Et on affiche le slot modal (qui sera vide ou contiendra l'interception) */}
      {modal}
    </div>
  );
}