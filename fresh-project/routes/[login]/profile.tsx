/** @jsxImportSource preact */
import { Handlers, PageProps } from "$fresh/server.ts";
import client from "../../../backend/database/database.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { login } = ctx.params;

    // Récupérer les informations de l'utilisateur depuis la base de données
    const result = await client.execute("SELECT * FROM github WHERE login = ?", [login]);
    const userData = result.rows && result.rows.length > 0 ? result.rows[0] : null;

    if (!userData) {
      return new Response("User not found", { status: 404 });
    }

    return ctx.render(userData);
  },
};

export default function ProfilePage(props: PageProps) {
  const { login, url_avatar, url_profil} = props.data;

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-md mx-auto bg-white p-5 rounded-lg shadow-lg">
        <div class="text-center">
        <h1 class="text-2xl font-bold mb-4">Welcome, {login}!</h1>
        <img src={url_avatar} alt={`${login}'s avatar`} class="w-32 h-32 rounded-full mx-auto mb-4" />
        <p>
          <a href={url_profil} target="_blank" class="text-blue-500">View GitHub Profile</a>
        </p>
        <p>
        <a href={`/${login}/todos`} class="text-blue-500">View my To-Do List</a>
        </p>
        </div>
        <p>
          <a href="/" class="text-left">↩Disconnect</a>
        </p>
      </div>
    </div>
  );
}