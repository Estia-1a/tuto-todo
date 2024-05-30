import { RouterContext } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { client_id, client_secret } from "../server.ts";
import { createUser } from "./users.ts";

// Route handler to redirect user to Github authentication page (GET)
export const redirectToGitHubLogin = (context: RouterContext) => {
  const redirectUrl =
    `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user`;
  context.response.redirect(redirectUrl);
};

// Route handler after GitHub authentification for accessing to user data (GET)
export const handleGitHubCallback = async (context: RouterContext) => {
  try {
    console.log("GitHub callback route hit");

    // Get the authorization code from the request URL
    const url = new URL(context.request.url);
    console.log("Request URL:", url.toString());
    const code = url.searchParams.get("code");
    console.log("Authorization code:", code);

    // Check if the authorization code is present
    if (!code) {
      context.response.status = 400;
      context.response.body = "Missing authorization code";
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
    console.log(tokenResponse);
    // Get GitHub access token data
    const tokenData = await tokenResponse.json();
    console.log("Token response data:", tokenData);
    const accessToken = tokenData.access_token;

    // Check if the access token is ok
    if (!accessToken) {
      context.response.status = 500;
      context.response.body = "Failed to obtain access token";
      return;
    }

    // Uses access token to get user data from GitHub API
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    // Get user data
    const userData = await userResponse.json();
    console.log("User data:", userData);

    // Add the user to the database with GitHub data
    await createUser(userData);
    console.log("User authenticated and logged in");

    // Redirect to the profil page
    context.response.redirect(
      `http://localhost:8000/${userData.login}/profile`,
    ); // remplacer par une redirection plus propre
  } catch (error) {
    console.error("Error during GitHub callback handling:", error);
    context.response.status = 500;
    context.response.body = "Internal server error";
  }
};
