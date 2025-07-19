import express from "express";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import chat from "../routes/chat.js";
import vote from "../routes/vote.js";
import announce from "../routes/announce.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/api/chat",      chat);
app.use("/api/vote",      vote);
app.use("/api/announce",  announce);

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