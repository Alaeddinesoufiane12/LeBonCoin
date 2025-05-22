const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] }).select('+password');
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email ou nom d\'utilisateur déjà utilisé' });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ success: true, message: 'Utilisateur créé' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(400).json({ success: false, error: err.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email et mot de passe requis' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ success: false, error: 'Utilisateur non trouvé' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ success: false, error: 'Mot de passe invalide' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token, userId: user._id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
