import { Router } from "express";
import { run, get, all } from "../src/db.js";
import crypto from "node:crypto";

const router = Router();

// POST /api/users  { name }
router.post("/", (req, res) => {
  const { name } = req.body as { name?: string };
  if (!name?.trim()) return res.status(400).json({ error: "name required" });

  // already in DB?
  const row = get<{ id: string | null }>(
    "SELECT id FROM users WHERE nickname = ?",
    name.trim()
  );
  if (row?.id) return res.json({ id: row.id });

  // create new string ID
  const newId = crypto.randomUUID();            // e.g. "c0a801-…"
  run(
    "INSERT INTO users (id, nickname) VALUES (?, ?)",
    newId,
    name.trim()
  );
  res.json({ id: newId });
});

router.get("/", (_, res) => {
  const rows = all("SELECT id, nickname FROM users ORDER BY nickname");
  res.json(rows);
});

export default router;