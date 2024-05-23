import { RouterContext } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { compare, hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import client from "../database/database.ts";

// Route handler to register a new user (POST)
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
      ctx.response.body = { error: "Pseudonyme already used." };
      return;
    }
    const hashmdp = await hash(mdp);

    await client.execute(
      "INSERT INTO users (pseudo, mdp) VALUES (?, ?)",
      [pseudo, hashmdp],
    );

    ctx.response.status = 201;
    ctx.response.body = { message: "User registered" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
};

// Route handler to log in user (GET)
export const loginUser = async (ctx: RouterContext) => {
  try {
    const data = await ctx.request.body().value;
    const pseudo = data.pseudo;
    const mdp = data.mdp;

    const users = await client.query("SELECT * FROM users WHERE pseudo = ?", [
      pseudo,
    ]);

    if (users.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Pseudonyme not found." };
      return;
    }

    const user = users[0];
    const validPassword = await compare(mdp, user.mdp);

    if (!validPassword) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Password incorrect." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "User connected", userId: user.id };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error." };
    console.error(error);
  }
};
