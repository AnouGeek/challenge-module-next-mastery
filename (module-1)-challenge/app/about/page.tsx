"use client"

import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Page about</h1>
      <Link href="/">Page d'accueil</Link>
      <button 
      onClick={() => console.log("clic !")}
      className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mt-4">Clic</button>
    </div>
  );
}
