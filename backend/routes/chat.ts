import { Router } from "express";
import { all, run } from "../src/db.js";

interface ChatRow {
  id: number;
  sender_id: string;
  receiver_id: string;
  text: string;
  created_at: string;
}
const router = Router();

// GET /api/chat?self=..&peer=..
router.get("/", (req, res) => {
  const { self, peer } = req.query as { self?: string; peer?: string };

  let rows: ChatRow[];
  if (self && peer) {
    rows = all<ChatRow>(
      `SELECT * FROM messages
       WHERE (sender_id=? AND receiver_id=?)
          OR (sender_id=? AND receiver_id=?)
       ORDER BY created_at`,
      self,
      peer,
      peer,
      self
    );
  } else {
    rows = all<ChatRow>("SELECT * FROM messages ORDER BY created_at");
  }
  res.json(rows);
});

// POST /api/chat { senderId, receiverId, text }
router.post("/", (req, res) => {
  const { senderId, receiverId, text } = req.body as {
    senderId?: string;
    receiverId?: string;
    text?: string;
  };
  if (!senderId || !receiverId || !text?.trim())
    return res.status(400).json({ error: "senderId, receiverId, text required" });

  run(
    "INSERT INTO messages (sender_id, receiver_id, text) VALUES (?,?,?)",
    senderId,
    receiverId,
    text.trim()
  );
  res.status(201).json({ ok: true });
});

export default router;