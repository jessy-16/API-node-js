import db from "../db.js";

export const getAllAuthors = (req, res) => {
    try {
        const authors = db.prepare("SELECT * FROM authors").all();
        res.json(authors);
    } catch {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

export const createAuthor = (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "name obligatoire"
            });
        }

        const stmt = db.prepare("INSERT INTO authors (name) VALUES (?)");
        const result = stmt.run(name);

        res.status(201).json({
            id: result.lastInsertRowid,
            name
        });

    } catch {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

export const getAuthorArticles = (req, res) => {
    try {
        const author = db.prepare("SELECT * FROM authors WHERE id = ?")
            .get(req.params.id);

        if (!author) {
            return res.status(404).json({ error: "Auteur introuvable" });
        }

        const articles = db.prepare(`
            SELECT id, title, content
            FROM articles
            WHERE author_id = ?
        `).all(req.params.id);

        res.json({
            author,
            articles
        });

    } catch {
        res.status(500).json({ error: "Erreur serveur" });
    }
};