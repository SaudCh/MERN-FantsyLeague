const leagueSchema = require("../Model/LeagueSchema");
const userSchema = require("../Model/userSchema");
const HttpError = require("../Model/HttpError")

//create league
const createLeague = async (req, res, next) => {
    const { userId, name } = req.body;

    const newLeague = new leagueSchema({
        createdBy: userId,
        name: name,
        users: userId
    });
    let league;
    try {
        league = await newLeague.save();
        await userSchema.findByIdAndUpdate(userId, { $push: { league: league._id } })
    } catch (err) {
        const error = new HttpError("League Creation Failed", 500);
        //console.log(err);
        return next(error);
    }

    res.status(201).json({ message: "League Creation Success" });
};

//join freinds league
const joinLeague = async (req, res, next) => {
    const { leagueId, uid } = req.params;

    try {
        await leagueSchema.findByIdAndUpdate(leagueId, {
            friends: uid
        });
        await userSchema.findByIdAndUpdate(uid, { $push: { fLeagues: leagueId } })
        await leagueSchema.findByIdAndUpdate(leagueId, { $push: { users: uid } })
    } catch (err) {
        const error = new HttpError("League Join Failed", 500);
        //console.log(err);
        return next(error);
    }

    res.status(201).json({ message: "League Join Success" });
};

//view Leagues by id
const viewLeague = async (req, res, next) => {
    const { leagueId } = req.params;

    let leagues;
    try {
        leagues = await leagueSchema.findById(leagueId).populate("users").sort({ points: -1 });
    } catch (err) {
        const error = new HttpError("League Creation Failed", 500);
        console.log(err);
        return next(error);
    }

    if (!leagues) {
        const error = new HttpError("No league Found For that id", 500);
        //console.log(err);
        return next(error);
    }

    res.status(201).json({ leagues: leagues });
};

//View all leagues
const viewllLeagues = async (req, res, next) => {
    let leagues;
    try {
        leagues = await leagueSchema.find().populate("createdBy")
    } catch (err) {
        const error = new HttpError("League Fetch Failed", 500);
        console.log(err);
        return next(error);
    }

    if (!leagues) {
        const error = new HttpError("No league Found", 500);
        //console.log(err);
        return next(error);
    }

    res.status(201).json({ leagues: leagues });
};

//delete league
const deleteLeague = async (req, res, next) => {
    const leagueId = req.params.id;
    try {
        await userSchema.updateMany({ $or: [{ league: leagueId }, { fLeagues: leagueId }] }, {
            $push: {
                league: leagueId,
                fLeagues: leagueId
            }
        })
    } catch (err) {
        const error = new HttpError("League Deletion Failed", 500);
        //console.log(err);
        return next(error);
    }


    try {
        await leagueSchema.findByIdAndDelete(leagueId)
    } catch (err) {
        const error = new HttpError("League Deletion Failed", 500);
        //console.log(err);
        return next(error);
    }

    res.status(201).json({ message: "League Deleted" });
}


//remove friends league
const removeLeague = async (req, res, next) => {
    const leagueId = req.params.id;
    try {
        await userSchema.findByIdAndUpdate(req.params.user, {
            $pull: {
                fLeagues: leagueId,
                users: leagueId
            }
        })
    } catch (err) {
        const error = new HttpError("League Removal Failed", 500);
        console.log(err);
        return next(error);
    }

    res.status(201).json({ message: "League Removed" });
}

//exports above function
exports.createLeague = createLeague
exports.deleteLeague = deleteLeague
exports.joinLeague = joinLeague
exports.removeLeague = removeLeague
exports.viewLeague = viewLeague
exports.viewllLeagues = viewllLeagues