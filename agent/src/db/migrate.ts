import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "../config.js";
import { createDb } from "./client.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const db = createDb(config.DATABASE_URL);
  const schema = await readFile(join(__dirname, "schema.sql"), "utf8");
  await db.query(schema);
  await db.close();
  console.log("MazyLabs agent migrations applied");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
