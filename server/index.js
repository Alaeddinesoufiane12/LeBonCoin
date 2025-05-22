require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connexion MongoDB avec gestion d'événements
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/leboncoin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
  // Démarrage du serveur uniquement après connexion MongoDB
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/ads', require('./routes/ads'));

// Gestion des erreurs globales pour toujours renvoyer du JSON
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});
