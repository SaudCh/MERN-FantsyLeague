const teamSchema = require("../Model/teamSchema");
const HttpError = require("../Model/HttpError");

const createTeam = async (req, res, next) => {
    const { userId } = req.body;

    const newTeam = new teamSchema({
        createdBy: userId
    });

    try {
        await newTeam.save();
    } catch (err) {
        const error = new HttpError("Team Creation Failed", 500);
        //console.log(err);
        return next(error);
    }

    res.status(201).json({ message: "Team Creation Success" });
};

const viewTeamById = async (req, res, next) => {
    let team;

    try {
        team = await teamSchema.findById(req.params.id);
    } catch (err) {
        const error = new HttpError("Could not find a Team", 500);
        return next(error);
    }

    if (!team) {
        return next(new HttpError("No Team Found", 404));
    }
    res.status(201).json({ data: team });
}

const viewAllTeams = async (req, res, next) => {
    let teams;

    try {
        teams = await teamSchema.find().populate('createdBy');
    } catch (err) {
        const error = new HttpError("Could not find", 500);
        return next(error);
    }

    res.status(201).json({ data: teams });
}

const viewTeamByUser = async (req, res, next) => {
    let team;

    try {
        team = await teamSchema.findOne({ createdBy: req.params.id }).populate('createdBy').populate('goalkeeper').populate('midfilder').populate("defender").populate("striker1").populate("striker2");
    } catch (err) {
        const error = new HttpError("Could not find", 500);
        return next(error);
    }

    res.status(201).json({ data: team });
}

const updateTeam = async (req, res, next) => {

    const { player, team, category } = req.body

    try {
        if (category === 'goal') {
            await teamSchema.findByIdAndUpdate(team, {
                goalkeeper: player
            })
        } else if (category === 'def') {
            await teamSchema.findByIdAndUpdate(team, {
                defender: player
            })
        } else if (category === 'mid') {
            await teamSchema.findByIdAndUpdate(team, {
                midfilder: player
            })
        } else if (category === 'st') {
            await teamSchema.findByIdAndUpdate(team, {
                striker1: player
            })
        } else if (category === 'ker') {
            await teamSchema.findByIdAndUpdate(team, {
                striker2: player
            })
        }
    } catch (err) {
        const error = new HttpError("Update Failed", 500);
        return next(error);
    }

    res.json({ message: "Player Added" });
}

const deletePlayerFromTeam = async (req, res, next) => {

    const id = req.params.id;
    const cat = req.params.cat

    try {
        if (cat === 'goal') {
            await teamSchema.findByIdAndUpdate(id,
                {
                    $unset: { goalkeeper: 1 }
                })
        } else if (cat === 'def') {
            await teamSchema.findByIdAndUpdate(id,
                {
                    $unset: { defender: 1 }
                })
        } else if (cat === 'mid') {
            await teamSchema.findByIdAndUpdate(id,
                {
                    $unset: { midfilder: 1 }
                })
        } else if (cat === 'st1') {
            await teamSchema.findByIdAndUpdate(id,
                {
                    $unset: { striker1: 1 }
                })
        } else if (cat === 'st2') {
            await teamSchema.findByIdAndUpdate(id,
                {
                    $unset: { striker2: 1 }
                })
        }
    } catch (err) {
        console.log(err)
        const error = new HttpError("Update Failed", 500);
        return next(error);
    }

    res.json({ message: "Player Removed" });
}

exports.createTeam = createTeam;
exports.viewTeamById = viewTeamById;
exports.viewAllTeams = viewAllTeams;
exports.updateTeam = updateTeam;
exports.viewTeamByUser = viewTeamByUser;
exports.deletePlayerFromTeam = deletePlayerFromTeam;