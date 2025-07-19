import Database from "better-sqlite3";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const db = new Database(join(__dirname, "db.sqlite3"));

export const run = (sql: string, ...p: unknown[]) => db.prepare(sql).run(...p);
export const all = <T>(sql: string, ...p: unknown[]) =>
  db.prepare(sql).all(...p) as T[];