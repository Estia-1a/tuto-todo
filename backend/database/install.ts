// deno-lint-ignore-file no-explicit-any
export default async function setupDatabase(client: any) {
  await client.transaction(async (conn: any) => {
    await conn.execute(`
    CREATE TABLE github (
      id int(10) UNIQUE NOT NULL,
      login varchar(255) NOT NULL,
      url_avatar varchar(255) NOT NULL,
      url_profil varchar(255) NOT NULL,
      PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `);
  });
}
