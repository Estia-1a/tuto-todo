import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  db: "db_todos",
  poolSize: 2,
  password: "0000",
});

await client.execute(`DROP TABLE IF EXISTS todos`);
await client.execute(`
    CREATE TABLE todos (
        id int(5) NOT NULL AUTO_INCREMENT,
        todo varchar(255) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`);

await client.execute(`INSERT INTO todos (todo) VALUES (?)`, ["Faire les courses"]);
await client.execute(`INSERT INTO todos (todo) VALUES (?)`, ["Préparer le rapport"]);
await client.execute(`INSERT INTO todos (todo) VALUES (?)`, ["Appeler le client"]);

export default client;