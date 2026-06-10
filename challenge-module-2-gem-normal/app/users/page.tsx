interface User {
  login: {
    uuid: string;
  }
  name: {
    first: string;
    last: string;
  }
}

type ApiResponse = {
  results: User[]
}

export default async function UsersPage() {
    const response = await fetch('https://randomuser.me/api/?results=5')
    // On indique à TypeScript la forme exacte de "data"
    const data: ApiResponse = await response.json()

    const users = data.results

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li 
            key={user.login.uuid}
            className="p-4 bg-gray-500 rounded-lg shadow"
          >
            {/* 3. On affiche les propriétés textuelles, pas les objets */}
            {user.name.first} {user.name.last}
          </li>
        ))}
      </ul>
    </div>
  )
}