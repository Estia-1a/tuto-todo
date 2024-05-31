/** @jsxImportSource preact */

interface ProfileIslandProps {
  data: {
    id: number;
    login: string;
    url_avatar: string;
    url_profil: string;
  };
}

export function ProfileIsland({ data }: ProfileIslandProps) {
  const { id, login, url_avatar, url_profil } = data;

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-md mx-auto bg-white p-5 rounded-lg shadow-lg">
        <div class="text-center">
          <h1 class="text-2xl font-bold mb-4">Welcome, {login}!</h1>
          <img src={url_avatar} alt={`${login}'s avatar`} class="w-32 h-32 rounded-full mx-auto mb-4" />
          <p>
            <a href={url_profil} target="_blank" class="text-blue-500">View my GitHub Profile</a>
          </p>
          <p>
            <a href={`/${id}/todos`} class="text-blue-500">View my To-Do List</a>
          </p>
        </div>
        <p>
          <a href="/" class="text-left">↩Disconnect</a>
        </p>
      </div>
    </div>
  );
}
