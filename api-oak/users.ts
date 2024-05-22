import { RouterContext } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import client from "../bd-mysql/database.ts";

// Register a new user (POST)
export const registerUser = async (ctx: RouterContext) => {
  try {
    const data = await ctx.request.body().value;
    const pseudo = data.pseudo;
    const mdp = data.mdp;

    const existingUser = await client.query(
      "SELECT * FROM users WHERE pseudo = ?",
      [pseudo],
    );

    if (existingUser.length > 0) {
      ctx.response.status = 409; 
      ctx.response.body = { error: "Ce pseudo est déjà utilisé." };
      return;
    }
    const hashmdp = await hash(mdp);

    await client.execute(
      "INSERT INTO users (pseudo, mdp) VALUES (?, ?)",
      [pseudo, hashmdp],
    );

    ctx.response.status = 201;
    ctx.response.body = { message: "User registered" };
  } 
  catch (error) {
    ctx.response.status = 500; 
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
};