import { RouterContext } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { client_id, client_secret } from "../server.ts";

// Route handler to redirect user to Github authentication page (GET)
export const redirectToGitHubLogin = (context: RouterContext) => {
  const redirectUrl =
    `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user`;
  context.response.redirect(redirectUrl);
};
