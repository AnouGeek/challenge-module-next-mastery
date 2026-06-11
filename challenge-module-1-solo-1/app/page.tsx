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
    <>
      <div className="flex">
        <h1>Home Page</h1>
        <Link
          className="text-xl text-yellow-700 border p-6 rounded ml-auto"
          href="/about"
        >
          {"Se rendre à la home page"}
        </Link>
      </div>
      <p className="text-center text-4xl bg-purple-300 text-cyan-800">
        Users list:{" "}
      </p>
      <ul className="space-y-4 max-w-xl mx-auto mt-10 bg-green-500 p-3 rounded border border-blue-500 shadow-md">
        {users.map((user: User) => (
          <li key={user.id}
          className="text-slate-100 hover:bg-pink-400 rounded-3xl p-4 cursor-pointer"
          >{user.name}</li>
        ))}
      </ul>
    </>
  );
}
