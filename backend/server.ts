import { Application } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.0/mod.ts";
import router from "./routes/index.ts";

const app = new Application();

// Charger les variables d'environnement
export const client_id = Deno.env.get("GITHUB_CLIENT_ID");
export const client_secret = Deno.env.get("GITHUB_CLIENT_SECRET");

// Enable CORS for all routes (cross-origin resource sharing)
app.use(oakCors());

// Use the defined routes
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on http://localhost:3000");

await app.listen({ port: 3000 });
