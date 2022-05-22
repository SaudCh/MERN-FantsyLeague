const adminSchema = require("../Model/adminSchema");
const HttpError = require("../Model/HttpError")

//to add admin
const register = async (req, res, next) => {

    const { email, password } = req.body;

    const newUser = new adminSchema({
        password: password,
        email: email
    });

    try {
        await newUser.save();
    } catch (err) {
        const error = new HttpError("Signup Failed", 500);
        return next(error);
    }

    res.status(201).json({ message: "Signup Success" });

};

//to auth admin
const login = async (req, res, next) => {

    let admin;

    try {
        admin = await adminSchema.findOne({ email: req.params.email });
    } catch (err) {
        const error = new HttpError("Login Failed Please try again later", 500);
        return next(error);
    }

    if (!admin || req.params.password != admin.password) {
        const error = new HttpError(
            "Invalid credential, could not log you in.",
            401
        );
        return next(error);
    }

    res.json({
        message: "Logged in!.",
        admin: admin.toObject({ getters: true }),
    });



};

//to update admin password
const updatePassword = async (req, res, next) => {
    // //console.log(req.body)
    const { userid, password, cpassword } = req.body;

    if (password != cpassword) {
        const error = new HttpError("Passwords did not match", 500);
        return next(error);
    }

    try {
        await adminSchema.findByIdAndUpdate(userid, {
            password: password,
        })
    } catch (err) {
        const error = new HttpError("Update Failed", 500);
        return next(error);
    }

    res.json({ message: "Password Updated Successfully" });
}

exports.updatePassword = updatePassword;
exports.register = register;
exports.login = login;
