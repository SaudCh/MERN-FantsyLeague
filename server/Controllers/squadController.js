const squadSchema = require("../Model/squadSchema");
const HttpError = require("../Model/HttpError")

//create a new squad
const createSquad = async (req, res, next) => {
    const { name, gamesPlayed, wins, draws, losses, gd, points } = req.body;

    if (!req.file) {
        const error = new HttpError("No Image added", 500);
        return next(error);
    }

    const newSquad = new squadSchema({
        name: name,
        gamesPlayed: gamesPlayed,
        wins: wins,
        draws: draws,
        losses: losses,
        gd: gd,
        points: points,
        image: req.file.path
    });

    try {
        await newSquad.save();
    } catch (err) {
        const error = new HttpError("Failed", 500);
        return next(error);
    }

    res.status(201).json({ message: "New Squad Added" });
};

//view all squad
const getAllSquad = async (req, res, next) => {
    let squad;

    try {
        squad = await squadSchema.find().sort({ points: -1, });;
    } catch (err) {
        const error = new HttpError("Could not find", 500);
        return next(error);
    }

    res.status(201).json({ squad: squad });
}

//update squad by suqad id
const updateSquad = async (req, res, next) => {
    const { sid, name, gamesPlayed, wins, draws, losses, gd, points } = req.body;
    //console.log(req.body);
    try {
        await squadSchema.findByIdAndUpdate(sid, {
            name: name,
            gamesPlayed: gamesPlayed,
            wins: wins,
            draws: draws,
            losses: losses,
            gd: gd,
            points: points,
        })
    } catch (err) {
        const error = new HttpError("Update Failed", 500);
        console.log(error)
        return next(error);
    }

    res.json({ message: "Squad Info Updated" });
}

//delete squad by squad id
const deleteSquad = async (req, res, next) => {
    try {
        await squadSchema.findByIdAndDelete(req.params.id)
    } catch (err) {
        const error = new HttpError("Delete Failed", 500);
        return next(error);
    }

    res.json({ message: "Squad Deleted" });
}

//export above function
exports.createSquad = createSquad;
exports.getAllSquad = getAllSquad;
exports.updateSquad = updateSquad;
exports.deleteSquad = deleteSquad;