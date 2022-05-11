const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userschema = Schema({
    name: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, ref: "user" },
    friends: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    users: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    isDeleted: { type: Boolean }
})

module.exports = mongoose.model("league", userschema);