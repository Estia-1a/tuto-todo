import { Application, Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import client from "./database.ts";

const app = new Application();
const router = new Router();

router.get("/", async (ctx) => {
    const result = await client.execute("SELECT * FROM ma_table");
    ctx.response.body = result;
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });