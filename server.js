import express from "express";
import "./db.js";
import authorsRoutes from "./routes/authors.routes.js";
import articlesRoutes from "./routes/articles.routes.js";
import { logger } from "./middlewares/logger.js";


// ✅ 1. créer app EN PREMIER
const app = express();

// ✅ 2. middleware
app.use(express.json());

// ✅ 3. routes
app.use("/authors", authorsRoutes);
app.use("/articles", articlesRoutes);

// route test
app.get("/", (req, res) => {
    res.send("API fonctionne !");
});

// ✅ 4. listen
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
app.use(logger);