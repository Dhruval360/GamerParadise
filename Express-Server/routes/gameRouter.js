const router = require('express').Router();

router.get('/', (req, res) => { // Needs to be changed to /AirHockey later so that other games can also be added
    console.log(req.query);
    res.render('Games/air_hockey', {qs : req.query}); // Renders the Air Hockey Game
});

module.exports = router;