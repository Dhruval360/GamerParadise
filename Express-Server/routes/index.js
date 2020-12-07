const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', forwardAuthenticated, (req, res) => res.render('welcome')); // Render welcome page
router.get('/dashboard', ensureAuthenticated, (req, res) => { 
  res.render('dashboard', {user: req.user}) // Render dashboard
  }
);

module.exports = router;