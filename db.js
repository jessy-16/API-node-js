import Database from "better-sqlite3";

const db = new Database("database.db");

db.exec(`
CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);
`);

export default db;