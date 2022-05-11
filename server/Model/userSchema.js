const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userschema = Schema({
    name: { type: String },
    password: { type: String },
    email: { type: String },
    team: { type: mongoose.Types.ObjectId, ref: "team" },
    points: { type: Number, default: 0 },
    league: [{ type: mongoose.Types.ObjectId, ref: "league" }],
    fLeagues: [{ type: mongoose.Types.ObjectId, ref: "league" }]

})

module.exports = mongoose.model("user", userschema);