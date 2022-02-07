const Team = require('../models/team.model');
const Game = require('../models/game.model');

const getTeams = async (req, res) => {

    const [teams, totalRegistros] = await Promise.all([
        Team.find({}, 'name state year trophies videoUrl url'), Team.countDocuments()]);

    res.json({
        ok: true,
        teams, totalRegistros
    });
}

const createTeam = async (req, res) => {

    const { name, year, state, trophies, videoUrl, url } = req.body;

    const team = new Team(req.body);

    await team.save();
    res.json({
        ok: true,
        message: 'team created',
        team
    });
}

const getTeam = async (req, res) => {

    const id = req.params.id;

    const teamDB = await Team.findById(id);

    if (!teamDB) {
        return res.status(401).json
            ({
                ok: false,
                msg: 'the team does nt exists'
            }
            );
    }

    res.json({
        ok: true,
        message: 'team found',
        team: teamDB
    });
}


const updateTeam = async (req, res = response) => {

    try {

        const id = req.params.id;
        const teamDB = await Team.findById(id);

        if (!teamDB) {
            return res.status(401).json
                ({
                    ok: false,
                    msg: 'no existe el equipo'
                }
                );
        }
        const changesTeam = { ...req.body };
        const updatedTeam = await Team.findByIdAndUpdate(id, changesTeam, { new: true });

        res.json(
            {
                ok: true,
                team: updatedTeam,
                msg: 'succed',
            });

    } catch (error) {

        console.error(error);
        res.status(500).json
            ({
                ok: false,
                msg: 'Error inesperado, ver Logs de servidor'
            }
            );
    }
}

const deleteTeam = async (req, res = response) => {

    try {
        const id = req.params.id;
        console.log('request to delete team by id ' + id);
        const teamDB = await Team.findById(id);

        if (!teamDB) {
            return res.status(401).json
                ({
                    ok: false,
                    msg: 'no existe el equipo'
                }
                );
        }

        const  existLocal = await Game.find({local: {$eq: id}}).exec();
        const existVisit = await Game.find({visitant: {$eq: id}}).exec();;
        if (existLocal.length > 0 || existVisit.length > 0 ) {
      
            return res.status(401).json(
                {
                    ok: false,
                    id,
                    msg: 'the team has a game to play',
                });
        }

         await Team.findByIdAndDelete(id);
         return res.json(
            {
                ok: true,
                msg: 'team was correctly deleted',
            });


     

    } catch (error) {

        console.error(error);
        res.status(500).json
            ({
                ok: false,
                msg: 'Error inesperado, ver Logs de servidor'
            }
            );
    }
}

module.exports = { getTeams, createTeam, getTeam, updateTeam, deleteTeam }