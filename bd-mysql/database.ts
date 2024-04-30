import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  db: "db",
  poolSize: 2,
  password: "db",
});

await client.execute(`CREATE DATABASE IF NOT EXISTS DBTodos`);
await client.execute(`USE DBTodos`);

await client.execute(`DROP TABLE IF EXISTS todos`);
await client.execute(`
    CREATE TABLE todos (
        id int(5) NOT NULL AUTO_INCREMENT,
        todo varchar(100) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`);

export default client;