const router = require('express').Router();

router.get('/AirHockey', (req, res) => res.render('Games/air_hockey', {qs : req.query})); 

router.get('/WordBeater', (req, res) => res.render('Games/word_beater', {qs : req.query}));

router.get('/Clicker2D', (req, res) => res.render('Games/Clicker2D/clicker_2D', {qs : req.query}));

module.exports = router;