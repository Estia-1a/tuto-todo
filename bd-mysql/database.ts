import { config } from "https://deno.land/x/dotenv/mod.ts";
import { join, dirname, fromFileUrl } from "https://deno.land/std/path/mod.ts";

// Get current path and load environment variables from .env
const __dirname = dirname(fromFileUrl(import.meta.url));
const envFilePath = join(__dirname, "../.env");
const envConfig = config({ path: envFilePath, export: true });

import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

// Database connection informations via .env
const client = await new Client().connect({
  hostname: Deno.env.get("DB_HOSTNAME") || "127.0.0.1",
  username: Deno.env.get("DB_USERNAME") || "root",
  db: Deno.env.get("DB_NAME") || "db_todos",
  poolSize: 2,
  password: Deno.env.get("DB_PASSWORD") || "",
});

// Check if the table exists
const result = await client.execute(`SHOW TABLES LIKE 'todos'`);
const tableExists = result.rows && result.rows.length > 0;

// If the table does not exist, call the installation script
if (!tableExists) {
  const { default: setupDatabase } = await import("./install.ts");
  await setupDatabase(client);
}

export default client;
