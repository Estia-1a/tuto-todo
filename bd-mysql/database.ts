import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  db: "db_todos",
  poolSize: 2,
  password: "0000",
});

// Vérifier si la table existe
const result = await client.execute(`SHOW TABLES LIKE 'todos'`);
const tableExists = result.rows && result.rows.length > 0;

// Si la table n'existe pas, créer la table et ajouter des valeurs d'essai
if (!tableExists) {
  await client.transaction(async (conn) => {
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

export default client;
