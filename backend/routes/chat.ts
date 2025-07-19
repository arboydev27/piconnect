import { Router } from "express";
import { all, run } from "../src/db.js";
const router = Router();

router.get("/", (_, res) =>
  res.json(all("SELECT id,text,created_at FROM messages ORDER BY created_at"))
);

router.post("/", (req, res) => {
  const { text } = req.body as { text?: string };
  if (!text?.trim()) return res.status(400).json({ error: "Empty message" });
  run("INSERT INTO messages(text) VALUES(?)", text.trim());
  res.status(201).json({ ok: true });
});

export default router;