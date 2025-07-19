import { Router } from "express";
import { all } from "../src/db.js";
const router = Router();

router.get("/", (_, res) =>
  res.json(
    all(`SELECT * FROM announcements
         WHERE expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP
         ORDER BY created_at DESC`)
  )
);

export default router;