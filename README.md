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

- Les routes `/api/auth` pour l'inscription/connexion
- Les routes `/api/ads` pour les annonces (CRUD, protégé par JWT)
