import Image from "next/image";
import Link from "next/link";

interface User {
  login: {
    uuid: string;
  }
  name: {
    first: string
    last: string
  }
}

type ApiResponse = {
  results: User[]
}

export default async function Home() {
  const response = await fetch('https://randomuser.me/api/?results=5')
  const data: ApiResponse = await response.json()

  const users = data.results

  return (
    <div>

      <h1>{"Page d'accueil"}</h1>
      <Link href="/user/123" className="underline text-blue-500">Voir le profil 123</Link>
      <p>List des utilisateurs : </p>
      <ul className="space-y-2">
        {users.map(user => (
          <li
          key={user.login.uuid}
          className="p-4 bg-gray-500 rounded-lg shadow"
          >
            <Link href={`/user/${user.login.uuid}`}>{user.name.first} {user.name.last}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
