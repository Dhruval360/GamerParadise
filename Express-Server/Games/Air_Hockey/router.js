const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.query)
    res.render('Games/air_hockey', {qs : req.query})
});

module.exports = router;