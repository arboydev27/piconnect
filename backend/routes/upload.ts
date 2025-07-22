import { Router } from "express";
import multer from "multer";
import fs from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadDir = join(__dirname, "..", "uploads");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (_req, file, cb) => {
        // Prefixing the file name with a timestamp to avoid conflicts
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (_req, file, cb) => {
        const ok = ["application/pdf", "video/", "audio/"].some((t) =>
            file.mimetype.startsWith(t)
    );
    cb(null, ok);
    },
});

const router = Router();

// POST /api/upload  ← front-end sends FormData { file }
// routes/upload.ts
// routes/upload.ts
router.post("/", upload.single("file"), (req, res) => {
  const file = (req as Express.Request & { file: Express.Multer.File }).file;
  if (!file) return res.status(400).json({ error: "no file" });

  res.status(201).json({ ok: true, file: file.filename });
});

export default router;