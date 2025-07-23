import { Router } from "express";
import { run, get, all } from "../src/db.js";
import fs from "node:fs";
import { join, dirname} from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadDir = join(__dirname, "..", "uploads");

const router = Router();

// POST /api/resources { fileName, title, description, types, uploaderId }
router.post("/", async (req, res) => {
    const { filename, title, description, types, section } = req.body;
    if (!filename || !title || !description || !types?.length  || !section) {
      return res.status(400).json({
        error: "All fields required incl. section",
      });
    }

    run(
        `INSERT INTO resources (filename, title, description, types, section)
        VALUES (?, ?, ?, ?, ?)`,
        filename,
        title,
        description,
        (Array.isArray(types) ? types : [types]).join(","), // ensure csv
        section
    );

    res.status(201).json({ ok: true });
});

// GET /api/resources -> list (latest first)
router.get("/", (req, res) => {
    const { section } = req.query;
    const rows = section
        ? all(
            `SELECT * FROM resources
            WHERE section = ?
            ORDER BY created_at DESC`,
            section
          )
        : all(
        `SELECT * FROM resources
         ORDER BY created_at DESC`
    );
    res.json(rows);
});

// DELETE /api/resources/:id
router.delete("/:id", (req, res) => {
    const row = get("SELECT filename FROM resources WHERE id = ?", req.params.id) as { filename: string } | undefined;
    if (!row) return res.status(404).json({ error: "Resource not found" });

    run("DELETE FROM resources WHERE id = ?", req.params.id);

    // Remove the file from uploads
    const p = join(uploadDir, row.filename);
    fs.unlink(p, (err) => {
        if (err && err.code !== "ENOENT") console.error(err); 
    });
    res.status(204).end();
});


export default router;