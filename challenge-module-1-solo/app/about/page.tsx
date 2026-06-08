"use client"

import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>À propos</h1>
      <Link 
      className="block mb-6"
      href="/">go to Home page</Link>
      <button 
      onClick={() => alert('et ça clique')}
      className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-150 cursor-pointer">Clic</button>
    </div>
  );
}
