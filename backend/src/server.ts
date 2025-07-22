import express from "express";
import path from "node:path";
// any file in backend/uploads becomes /uploads/<filename>
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";


import chat from "../routes/chat.js";
import vote from "../routes/vote.js";
import announce from "../routes/announce.js";
import usersRoutes from "../routes/users.js";
import fileUploadRouter from "../routes/upload.js";
import resourcesRoutes from "../routes/resources.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/resources", resourcesRoutes)
app.use("/uploads", express.static(join(__dirname, "uploads")));
app.use("/api/chat",      chat);
app.use("/api/vote",      vote);
app.use("/api/announce",  announce);
app.use("/api/users", usersRoutes);
app.use("/api/upload", fileUploadRouter);

// static Next.js export
app.use(
  express.static(path.join(__dirname, "..", "..", "frontend", "out"))
);
app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "..", "..", "frontend", "out", "index.html"))
);

app.listen(PORT, () =>
  console.log(`PiConnect API running at http://localhost:${PORT}`)
);