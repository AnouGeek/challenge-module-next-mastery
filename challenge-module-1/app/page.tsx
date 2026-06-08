import Image from "next/image";
import Link from "next/link";

interface User {
  id: number;
  name: string;
}

export default async function Home() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return (
    <div>
      <h1>Page d&apos;accueil</h1>
      <Link href="/about">Page about</Link>
      <ul className="flex flex-col gap-3">
        {users.map((user: User) => (
          <li 
          key={user.id}
          className="flex items-center gap-2 font-open mx-auto">{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
