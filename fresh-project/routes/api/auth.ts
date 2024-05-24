import { Handlers } from "$fresh/server.ts";

// Load environment variable
const client_id = Deno.env.get("GITHUB_CLIENT_ID");

const redirectURI = "http://localhost:3000/auth/github/callback";

// Handler to redirect the user to the GitHub authorization page
export const handler: Handlers = {
  GET() {
    const authURL = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectURI}&scope=read:user`;
    return Response.redirect(authURL, 302);
  },
};
