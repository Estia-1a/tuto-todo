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
export const getUserId = async (ctx: any) => {
  const login = ctx.params.login;
  if (login !== undefined) {
    if (typeof login === 'string' && login.length > 0)  {
      try {
        const result = await client.query(
          `SELECT id FROM db_todos.github WHERE login = ?`,
          [login],
        );
        if (result.length > 0) {
          const user_id = result[0];
          ctx.response.status = 201;
          ctx.response.body = {
            success: true,
            data: user_id,
            message: "User Id recovered",
          };
          return;
        } else {
          ctx.response.status = 404;
          ctx.response.body = {
            success: false,
            message: "User Id not found",
          };
          return;
        }
      } catch (error) {
        console.error(error);
        ctx.response.status = 500;
        ctx.response.body = {
          success: false,
          message: "Internal Server Error",
        };
        return;
      }
    } else {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "Invalid login parameter",
      };
      return;
    }
  } else {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      message: "Index parameter is missing",
    };
    return;
  }
};