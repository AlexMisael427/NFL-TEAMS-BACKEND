const {Router} = require('express');
const {getTeams, createTeam, getTeam,updateTeam,deleteTeam} = require('../controllers/teams.controller');
const router =  Router();

router.get('/',getTeams);

router.post('/',createTeam)
router.get('/:id',getTeam)
router.put('/:id',updateTeam)
router.delete('/:id',deleteTeam)


module.exports = router;