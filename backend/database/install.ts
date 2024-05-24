// deno-lint-ignore-file no-explicit-any
export default async function setupDatabase(client: any) {
  await client.transaction(async (conn: any) => {
    await conn.execute(`
      CREATE TABLE IF NOT EXITS _user (
        id int(5) NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS todo (
        id int(5) NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        user_id int(5) NOT NULL,
        PRIMARY KEY (id),
        foreign key (user_id) references _user (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `);

    await conn.execute(`
      CREATE TABLE github (
        id int(10) UNIQUE NOT NULL,
        login varchar(255) NOT NULL,
        url_avatar varchar(255) NOT NULL,
        profil_url varchar(255) NOT NULL,
        user_id int(5) NOT NULL,
        PRIMARY KEY (id),
        foreign key (user_id) references _user (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `);
  });
}
