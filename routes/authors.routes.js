import express from "express";
import { getAllAuthors, createAuthor, getAuthorArticles } from "../controllers/authors.controller.js";

const router = express.Router();

router.get("/", getAllAuthors);

router.post("/", createAuthor);

router.get("/:id/articles", getAuthorArticles);

export default router;