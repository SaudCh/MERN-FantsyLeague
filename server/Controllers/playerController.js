const playerSchema = require("../Model/playerSchema");
const userSchema = require("../Model/userSchema");
const teamSchema = require("../Model/teamSchema");
const HttpError = require("../Model/HttpError")

//Create new Player
const addPlayer = async (req, res, next) => {
    const { name, position, team, points } = req.body;

    if (!req.file) {
        const error = new HttpError("No Image added", 500);
        return next(error);
    }

    const newPlayer = new playerSchema({
        name: name,
        position: position,
        team: team,
        points: points,
        image: req.file.path
    });

    try {
        await newPlayer.save();
    } catch (err) {
        const error = new HttpError("Failed", 500);
        return next(error);
    }

    res.status(201).json({ message: "New Player Added" });
};

//get player by player Id
const getPlayerById = async (req, res, next) => {
    let user;

    try {
        user = await userschema.findById(req.params.id);
    } catch (err) {
        const error = new HttpError("Could not find a User for that id", 500);
        return next(error);
    }

    if (!user) {
        return next(new HttpError("No User Found", 404));
    }
    res.status(201).json({ user });
}

//get All players
const getAllPlayers = async (req, res, next) => {
    let users;

    try {
        users = await playerSchema.find();
    } catch (err) {
        const error = new HttpError("Could not find", 500);
        return next(error);
    }

    res.status(201).json({ data: users });
}


//update player points
const updatePoints = async (req, res, next) => {
    const { uid, prevPoint, currpoints } = req.body;
    const newPoint = currpoints - prevPoint
    let users;
    try {
        users = await teamSchema.find({ $or: [{ goalkeeper: uid }, { defender: uid }, { midfilder: uid }, { striker1: uid }, { striker2: uid }] }).populate('createdBy')
    } catch (err) {
        const error = new HttpError("Update Failed", 500);
        return next(error);
    }

    try {
        users.forEach(async (usr, ind) => {
            await userSchema.findByIdAndUpdate(usr.createdBy._id, {
                points: usr.createdBy.points + newPoint
            })
        })
    } catch (err) {
        const error = new HttpError("Update Failed", 500);
        return next(error);
    }

    try {
        await playerSchema.findByIdAndUpdate(uid, {
            points: currpoints
        })
    } catch (err) {
        const error = new HttpError("Update Failed", 500);
        return next(error);
    }

    res.json({ message: "Player Points Updated" });
}

//update player info
const updatePlayer = async (req, res, next) => {
    const { uid, name, position, team } = req.body;
    //console.log(req.body);
    try {
        await playerSchema.findByIdAndUpdate(uid, {
            name: name,
            position: position,
            team: team
        })
    } catch (err) {
        const error = new HttpError("Update Failed", 500);
        return next(error);
    }

    res.json({ message: "Player Info Updated" });
}


//delete player
const deletePlayer = async (req, res, next) => {
    // console.log(req.body)
    try {
        await playerSchema.findByIdAndDelete(req.params.id)
    } catch (err) {
        const error = new HttpError("Delete Failed", 500);
        return next(error);
    }

    res.json({ message: "Player Deleted" });
}

//export above function
exports.addPlayer = addPlayer;
exports.getPlayerById = getPlayerById;
exports.getAllPlayers = getAllPlayers;
exports.updatePlayer = updatePlayer;
exports.deletePlayer = deletePlayer;
exports.updatePoints = updatePoints;