const userschema = require("../Model/userSchema");
const HttpError = require("../Model/HttpError");
const teamSchema = require("../Model/teamSchema")

//register new user
const register = async (req, res, next) => {
    const { name, password, email } = req.body;

    let exsitingUser;
    try {
        exsitingUser = await userschema.findOne({ email: email });
    } catch (err) {
        const error = new HttpError("Sign up Failed Please try again later", 500);
        return next(error);
    }

    if (exsitingUser) {
        const error = new HttpError("Email Already exist", 422);
        return next(error);
    }

    const newTeam = new teamSchema({
        name: name + "'s Team"
    });
    let team;
    try {
        team = await newTeam.save();
    } catch (err) {
        const error = new HttpError("Signup Failed", 500);
        return next(error);
    }

    const newUser = new userschema({
        name: name,
        password: password,
        email: email,
        team: team._id,
    });

    let user;
    try {
        user = await newUser.save();
    } catch (err) {
        const error = new HttpError("Signup Failed", 500);
        return next(error);
    }

    try {
        await teamSchema.findByIdAndUpdate(team._id, {
            createdBy: user._id
        });
    } catch (err) {
        const error = new HttpError("Signup Failed", 500);
        return next(error);
    }

    res.status(201).json({ message: "Signup Success" });
};

//auth user
const login = async (req, res, next) => {
    let user;

    try {
        user = await userschema.findOne({ email: req.params.email });
    } catch (err) {
        const error = new HttpError("Login Failed Please try again later", 500); // for Sync function
        return next(error);
    }

    if (!user || req.params.password != user.password) {
        const error = new HttpError(
            "Invalid credential, could not log you in.",
            401
        );
        return next(error);
    }

    res.json({
        message: "Logged in!.",
        user: user.toObject({ getters: true }),
    });

};

//view user by user id
const getUser = async (req, res, next) => {
    let user;

    try {
        user = await userschema.findById(req.params.id).populate('team').populate("league").populate("fLeagues");
    } catch (err) {
        const error = new HttpError("Could not find a User for that id", 500);
        return next(error);
    }

    if (!user) {
        return next(new HttpError("No User Found", 404));
    }
    res.status(201).json({ user });
}

//view all users
const getAllUser = async (req, res, next) => {
    let users;

    try {
        users = await userschema.find({}, 'name points team email').populate('team').sort({ points: -1 });
    } catch (err) {
        const error = new HttpError("Could not find", 500);
        return next(error);
    }

    res.status(201).json({ data: users });
}

//update user by user id
const updateUser = async (req, res, next) => {
    // //console.log(req.body)
    const { userid, name, phone, address } = req.body;
    try {
        await userschema.findByIdAndUpdate(userid, {
            name: name,
            address: address,
            phone: phone
        })
    } catch (err) {
        const error = new HttpError("Update Failed", 500);
        return next(error);
    }

    res.json({ message: "User Info Updated Successfully" });
}

//delete user
const deleteUser = async (req, res, next) => {
    // //console.log(req.body)
    try {
        await userschema.findByIdAndDelete(req.params.id)
        await teamSchema.deleteMany({ createdBy: req.params.id })
    } catch (err) {
        const error = new HttpError("Delete Failed", 500);
        return next(error);
    }

    res.json({ message: "User Deleted" });
}

exports.register = register;
exports.login = login;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.getAllUser = getAllUser;
exports.deleteUser = deleteUser;