// deno-lint-ignore-file no-explicit-any
import client from "../database/database.ts";

// Function to add user in database if not exists
export const createUser = async (userData: any) => {
  // Check if the user exists
  const existingUser = await client.query(
    `SELECT * FROM github WHERE id = ?`,
    [userData.id]
  );

  if (existingUser.length === 0) {
    // Add the user to the database
    await client.execute(`
      INSERT INTO github (id, login, url_avatar, url_profil)
      VALUES (?, ?, ?, ?)
    `, [userData.id, userData.login, userData.avatar_url, userData.html_url]);
  } else {
    console.log("User already exists");
  }
};

// Handler to add user in database if not exists (GET)
export const getUserData = async (ctx: any) => {
  const id = ctx.params.id;

  // Vérifier que l'ID est défini et qu'il s'agit d'un nombre valide
  if (id !== undefined) {
    const userId = parseInt(id, 10);  // Convertir l'ID en nombre
    if (!isNaN(userId) && userId > 0) {
      try {
        // Exécuter la requête pour récupérer les données de l'utilisateur
        const result = await client.query(
          `SELECT * FROM db_todos.github WHERE id = ?`,
          [userId],
          
        );
        ctx.response.status = 200;
        ctx.response.body = result;
      } catch (_error) {
        console.error("Database query error:", _error);
        ctx.response.status = 500;
        ctx.response.body = { error: "Internal Server Error" };
      }
    } else {
      ctx.response.status = 400;
      ctx.response.body = { error: "Invalid user ID" };
    }
  } else {
    ctx.response.status = 400;
    ctx.response.body = { error: "User ID is required" };
  }
};