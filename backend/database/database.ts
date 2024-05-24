import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { join, dirname, fromFileUrl } from "https://deno.land/std@0.224.0/path/mod.ts";
import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

// Get current path and load environment variables from .env
const __dirname = dirname(fromFileUrl(import.meta.url));
const envFilePath = join(__dirname, "../../.env");
const _envConfig = config({ path: envFilePath, export: true });

// Database connection informations via .env
const client = await new Client().connect({
  hostname: Deno.env.get("DB_HOSTNAME"),
  username: Deno.env.get("DB_USERNAME"),
  db: Deno.env.get("DB_NAME"),
  poolSize: 2,
  password: Deno.env.get("DB_PASSWORD"),
});

// Check if the tables exist
const result = await client.execute(`SHOW TABLES`);
const tablesExist = result.rows && result.rows.length > 2;

// If tables don't exist, call the installation script
if (!tablesExist) {
  const { default: setupDatabase } = await import("./install.ts");
  await setupDatabase(client);
}

export default client;
