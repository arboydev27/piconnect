-- Users (simple nickname registry)
CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  nickname    TEXT NOT NULL UNIQUE,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- new table
CREATE TABLE IF NOT EXISTS resources (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  filename     TEXT,
  title        TEXT,
  description  TEXT,
  types        TEXT,          -- "pdf,audio"
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id    TEXT NOT NULL,
  receiver_id  TEXT NOT NULL,
  text         TEXT NOT NULL,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id)   REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS polls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_open INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS poll_options (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  poll_id INTEGER NOT NULL,
  option_text TEXT NOT NULL,
  FOREIGN KEY (poll_id) REFERENCES polls(id)
);

CREATE TABLE IF NOT EXISTS poll_votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  poll_option_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poll_option_id) REFERENCES poll_options(id)
);

CREATE TABLE IF NOT EXISTS announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME
);