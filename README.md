# Leboncoin MERN Clone

## Backend
- Express, MongoDB, JWT, bcrypt
- Authentification sécurisée, CRUD annonces

## Frontend
- React (Create React App)
- Gestion des états locaux

### Lancer le backend
```powershell
cd server
npm install
npm start
```

### Lancer le frontend
```powershell
cd client
npm install
npm start
```

### Variables d'environnement
- Créez un fichier `.env` dans `server/` avec :
  - `MONGODB_URI=mongodb://localhost:27017/leboncoin`
  - `JWT_SECRET=supersecretkey`

---

## Fonctionnalités implémentées

- Authentification sécurisée (inscription, connexion) avec hashage des mots de passe (bcrypt) et token JWT
- CRUD complet sur les annonces (créer, lire, modifier, supprimer)
- Association automatique de l'annonce à l'utilisateur connecté via le token JWT (champ `author` injecté côté backend)
- Filtrage des annonces par catégorie
- Détail d'une annonce (titre, description, prix, catégorie, auteur)
- Interface utilisateur moderne avec Bootstrap
- Gestion de l'état de l'application uniquement avec des states locaux React
- Stockage du token JWT dans le localStorage côté client
- Toutes les routes CRUD annonces sont protégées (nécessitent un token JWT)
- Le CRUD sur les annonces n'est pas restreint à l'auteur (tout utilisateur connecté peut modifier ou supprimer n'importe quelle annonce)

---

- Les routes `/api/auth` pour l'inscription/connexion
- Les routes `/api/ads` pour les annonces (CRUD, protégé par JWT)
