const {Router} = require('express');
const { getGames, creategame } = require('../controllers/games.controller');
const router =  Router();

router.get('/',getGames);

router.post('/',creategame)


module.exports = router;