import client from "../database/database.ts";

export const createUser = async (userData: any) => {
  // Vérifiez si l'utilisateur existe déjà
  const existingUser = await client.query(
    `SELECT * FROM github WHERE id = ?`,
    [userData.id]
  );

  if (existingUser.length === 0) {
    // Insérez les données utilisateur dans la table github
    await client.execute(`
      INSERT INTO github (id, login, url_avatar, url_profil)
      VALUES (?, ?, ?, ?)
    `, [userData.id, userData.login, userData.avatar_url, userData.html_url]);
  } else {
    console.log("User already exists");
  }
};
