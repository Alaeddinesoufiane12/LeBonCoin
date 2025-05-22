const express = require('express');
const Ad = require('../models/Ad');
const auth = require('../middleware/auth');

const router = express.Router();

// Créer une annonce (protégé)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const ad = new Ad({
      title,
      description,
      price,
      category,
      author: req.user.id, // récupéré via le token JWT
    });
    await ad.save();
    res.status(201).json(ad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lire toutes les annonces avec filtrage par catégorie
router.get('/', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const ads = await Ad.find(filter).populate('author', 'username');
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lire une annonce par ID
router.get('/:id', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('author', 'username');
    if (!ad) return res.status(404).json({ error: 'Annonce non trouvée' });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour une annonce (protégé)
router.put('/:id', auth, async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ error: 'Annonce non trouvée' });
    Object.assign(ad, req.body);
    await ad.save();
    res.json(ad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Supprimer une annonce (protégé)
router.delete('/:id', auth, async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ error: 'Annonce non trouvée' });
    await ad.deleteOne();
    res.json({ message: 'Annonce supprimée' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
