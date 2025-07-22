import { Router } from "express";
import { run, all } from "../src/db.js";

const router = Router();

// POST /api/resources { fileName, title, description, types, uploaderId }
router.post("/", async (req, res) => {
    const { filename, title, description, types } = req.body;
    if (!filename || !title || !description || !types?.length) {
      return res.status(400).json({
        error: "filename, title, description and at least one type are required",
      });
    }

    run(
        `INSERT INTO resources (filename, title, description, types)
        VALUES (?, ?, ?, ?)`,
        filename,
        title,
        description,
        (Array.isArray(types) ? types : [types]).join(","), // ensure csv
    );

    res.status(201).json({ ok: true });
});

// GET /api/resources -> list (latest first)
router.get("/", (_, res) => {
    const rows = all(
        `SELECT id, filename, title, description, types, createdAt
        FROM resources
        ORDER BY createdAt DESC`
    );
    res.json(rows);
});

export default router;