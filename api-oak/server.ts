import { Application } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.0/mod.ts";
import router from "./routes.ts";

const app = new Application();

/* Enable CORS for all routes (cross-origin resource sharing) */
app.use(oakCors());

/* Use the defined routes */
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on http://localhost:8000");

await app.listen({ port: 8000 });