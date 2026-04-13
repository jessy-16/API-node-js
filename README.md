Cette API permet de gérer des auteurs et des articles avec Node.js, Express et SQLite. Chaque article est lié à un auteur.

Installation :

npm install
node server.js

Serveur :

http://localhost:3000

👤 AUTHORS

➤ Récupérer tous les auteurs
GET /authors

➤ Créer un auteur
POST /authors

📌 Exemple JSON
{
  "name": "Jessyca"
}

📚 ARTICLES

➤ Récupérer tous les articles (avec auteur)
GET /articles

➤ Récupérer un article par ID
GET /articles/:id

➤ Créer un article
POST /articles

📌 Exemple JSON
{
  "title": "Mon article",
  "content": "Hello world",
  "author_id": 1
}

➤ Modifier un article
PUT /articles/:id

📌 Exemple JSON
{
  "title": "Article modifié",
  "content": "Nouveau contenu",
  "author_id": 1
}

➤ Supprimer un article
DELETE /articles/:id

🔗 BONUS
➤ Récupérer un auteur avec ses articles
GET /authors/:id/articles

🧪 Exemples de réponses
👤 Auteur
{
  "id": 1,
  "name": "Jessyca"
}
📚 Article (avec JOIN)
{
  "id": 1,
  "title": "Mon article",
  "content": "Hello world",
  "author_name": "Jessyca"
}
🔗 Auteur + articles
{
  "author": {
    "id": 1,
    "name": "Jessyca"
  },
  "articles": [
    {
      "id": 1,
      "title": "Mon article",
      "content": "Hello world"
    }
  ]
}

🎯 Fonctionnalités

✔ CRUD complet
✔ Validation des données
✔ Relations SQL (JOIN)
✔ Middleware de logs (bonus)
✔ API REST structurée
