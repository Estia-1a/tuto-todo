/** @jsxImportSource preact */
import { Handlers, PageProps } from "$fresh/server.ts";
import { ProfileIsland } from "../../islands/Profile.tsx";

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
  return (
    <div>
      <ProfileIsland data={props.data} />
    </div>
  );
}
