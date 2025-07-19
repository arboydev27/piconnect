import { Router } from "express";
import { db, all, run } from "../src/db.js";
const router = Router();

router.get("/", (_, res) => {
  const polls = all("SELECT * FROM polls WHERE is_open = 1");
  polls.forEach((p: any) => {
    p.options = all(
      `SELECT id,option_text,
       (SELECT COUNT(*) FROM poll_votes WHERE poll_option_id = poll_options.id) AS votes
       FROM poll_options WHERE poll_id=?`,
      p.id
    );
  });
  res.json(polls);
});

router.post("/vote", (req, res) => {
  const { optionId } = req.body as { optionId?: number };
  if (!optionId) return res.status(400).json({ error: "optionId required" });
  run("INSERT INTO poll_votes(poll_option_id) VALUES(?)", optionId);
  res.status(201).json({ ok: true });
});

router.post("/", (req, res) => {
  const { question, options } = req.body as { question?: string; options?: string[] };
  if (!question || !options || options.length < 2)
    return res.status(400).json({ error: "Need question & >=2 options" });

  const { lastInsertRowid } = run("INSERT INTO polls(question) VALUES(?)", question);
  const stmt = db.prepare("INSERT INTO poll_options(poll_id, option_text) VALUES(?,?)");
  options.forEach(o => stmt.run(lastInsertRowid, o));
  res.status(201).json({ ok: true });
});

export default router;