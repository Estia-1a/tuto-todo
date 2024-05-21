export default async function setupDatabase(client: any) {
    await client.transaction(async (conn: any) => {
      await conn.execute(`
        CREATE TABLE IF NOT EXISTS todos (
            id int(5) NOT NULL AUTO_INCREMENT,
            todo varchar(255) NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `);
  
      await conn.execute(`INSERT INTO todos (todo) VALUES (?)`, ["Feed the ewes"]);
      await conn.execute(`INSERT INTO todos (todo) VALUES (?)`, ["Repair the wings of the mill"]);
      await conn.execute(`INSERT INTO todos (todo) VALUES (?)`, ["Cook a good cassoulet for tomorrow"]);
    });
  }
  