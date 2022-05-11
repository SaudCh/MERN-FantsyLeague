const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = Schema({
    name: { type: String },
    goalkeeper: { type: mongoose.Types.ObjectId, ref: "player" },
    midfilder: { type: mongoose.Types.ObjectId, ref: "player" },
    defender: { type: mongoose.Types.ObjectId, ref: "player" },
    striker1: { type: mongoose.Types.ObjectId, ref: "player" },
    striker2: { type: mongoose.Types.ObjectId, ref: "player" },
    createdBy: { type: mongoose.Types.ObjectId, ref: "user" },

})

module.exports = mongoose.model("team", teamSchema);