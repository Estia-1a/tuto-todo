import { RouterContext } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { client_id, client_secret } from "../server.ts";

// Route handler to redirect user to Github authentication page (GET)
export const redirectToGitHubLogin = (context: RouterContext) => {
  const redirectUrl =
    `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user`;
  context.response.redirect(redirectUrl);
};

// Route handler after GitHub authentification for accessing to user data (GET)
export const handleGitHubCallback = async (context: RouterContext) => {
  // Get the authorization code from the request URL
  const code = context.request.url.searchParams.get("code");

  // Check if the authorization code is present
  if (!code) {
    context.response.status = 400;
    context.response.body = "Missing authorization code";
    return;
  }

  // Checks if client_id and client_secret are configured
  if (!client_id || !client_secret) {
    context.response.status = 500;
    context.response.body = "GitHub client ID or secret not configured";
    return;
  }

  // Exchange the authorization code for a GitHub access token
  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    },
  );

  // Get GitHub access token data
  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Uses access token to get user data from GitHub API
  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  // Get user data
  const userData = await userResponse.json();

  // Return user data in response
  context.response.body = userData;
};
