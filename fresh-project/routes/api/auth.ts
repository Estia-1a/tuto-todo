import { Handlers } from "$fresh/server.ts";

// Charger les variables d'environnement
const client_id = Deno.env.get("GITHUB_CLIENT_ID");

const redirectURI = "http://localhost:3000/auth/github/callback";

export const handler: Handlers = {
  GET() {
    const authURL = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectURI}&scope=read:user`;
    return Response.redirect(authURL, 302);
  },
};
