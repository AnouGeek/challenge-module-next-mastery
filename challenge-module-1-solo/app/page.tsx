import Image from "next/image";
import Link from "next/link";

interface User {
  id: number;
  name: string;
}

export default async function Home() {

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()

  return (
    <div>
      <h1>Home page</h1>
      <Link href="/about">Aller sur la page À propos</Link>
      <ul className="max-w-md mx-auto mt-6 space-y-3 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        {users.map((user: User) => (
          <li 
          key={user.id}
          className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:scale-[1.02] transition-all duration-200 text-slate-200 font-medium shadow-sm">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
