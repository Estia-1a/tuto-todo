import { RouterContext } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { client_id, client_secret } from "../server.ts";
import { createUser } from "../controllers/users.ts";

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

    const url = new URL(context.request.url);
    console.log("Request URL:", url.toString());
    const code = url.searchParams.get("code");
    console.log("Authorization code:", code);

    if (!code) {
      context.response.status = 400;
      context.response.body = "Missing authorization code";
      return;
    }

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
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
    });

    const tokenData = await tokenResponse.json();
    console.log("Token response data:", tokenData);
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      context.response.status = 500;
      context.response.body = "Failed to obtain access token";
      return;
    }

    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();
    console.log("User data:", userData);

    // Enregistrer l'utilisateur dans la base de données
    await createUser(userData);

    context.response.body = "User authenticated and logged in";
  } catch (error) {
    console.error("Error during GitHub callback handling:", error);
    context.response.status = 500;
    context.response.body = "Internal server error";
  }
};