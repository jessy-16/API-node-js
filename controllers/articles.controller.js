import db from "../db.js";

// GET /articles
export const getAllArticles = (req, res) => {
    try {
        const articles = db.prepare(`
            SELECT 
                articles.id,
                articles.title,
                articles.content,
                authors.name AS author_name
            FROM articles
            JOIN authors ON articles.author_id = authors.id
        `).all();

        res.json(articles);
    } catch {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// GET /articles/:id
export const getArticleById = (req, res) => {
    try {
        const article = db
            .prepare("SELECT * FROM articles WHERE id = ?")
            .get(req.params.id);

        if (!article) {
            return res.status(404).json({ error: "Article non trouvé" });
        }

        res.json(article);
    } catch {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// POST /articles
export const createArticle = (req, res) => {
    try {
        const { title, content, author_id } = req.body;

        if (!title || !content || !author_id) {
            return res.status(400).json({
                error: "title, content et author_id obligatoires"
            });
        }

        const author = db
            .prepare("SELECT * FROM authors WHERE id = ?")
            .get(author_id);

        if (!author) {
            return res.status(400).json({
                error: "Auteur invalide"
            });
        }

        const result = db.prepare(`
            INSERT INTO articles (title, content, author_id)
            VALUES (?, ?, ?)
        `).run(title, content, author_id);

        res.status(201).json({
            id: result.lastInsertRowid,
            title,
            content,
            author_id
        });

    } catch {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// PUT /articles/:id
export const updateArticle = (req, res) => {
    try {
        const { title, content, author_id } = req.body;

        const article = db
            .prepare("SELECT * FROM articles WHERE id = ?")
            .get(req.params.id);

        if (!article) {
            return res.status(404).json({ error: "Article non trouvé" });
        }

        db.prepare(`
            UPDATE articles
            SET title = ?, content = ?, author_id = ?
            WHERE id = ?
        `).run(title, content, author_id, req.params.id);

        res.json({ message: "Article mis à jour" });

    } catch {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// DELETE /articles/:id
export const deleteArticle = (req, res) => {
    try {
        const result = db
            .prepare("DELETE FROM articles WHERE id = ?")
            .run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ error: "Article non trouvé" });
        }

        res.json({ message: "Article supprimé" });

    } catch {
        res.status(500).json({ error: "Erreur serveur" });
    }
};