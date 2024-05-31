/** @jsxImportSource preact */
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { id } = ctx.params;

    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return new Response("Invalid user ID", { status: 400 });
    }
    try {
      const resp = await fetch(`http://localhost:3000/user/${userId}`);
      if (!resp.ok) {
        console.error("Failed to fetch user:", resp.statusText);
        return new Response("User not found", { status: 404 });
      }
      const userData = await resp.json();
      return ctx.render(userData[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

export default function ProfilePage(props: PageProps) {
  const { id, login, url_avatar, url_profil } = props.data;
  console.log(props.data);

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
            <a href={`/${id}/todos`} class="text-blue-500">View the To-Do List</a>
          </p>
        </div>
        <p>
          <a href="/" class="text-left">↩Disconnect</a>
        </p>
      </div>
    </div>
  );
}
