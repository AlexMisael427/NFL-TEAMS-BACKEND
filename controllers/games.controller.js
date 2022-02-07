const Game = require('../models/game.model');

const getGames = async (req,res)=>{

    const [games, totalRegistros] = await Promise.all([
        Game.find()
        .populate('local','name url')
        .populate('visitant','name url'),
        ,Game.countDocuments()]);
    
    res.json({
        ok:true,
        games, totalRegistros
    });
}

const creategame = async (req,res)=>{

    const game = new Game(req.body);

    await game.save();
    res.json({
        ok:true,
        message:'game created',
        game
    });
}

module.exports = {getGames,creategame}