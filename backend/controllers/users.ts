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
