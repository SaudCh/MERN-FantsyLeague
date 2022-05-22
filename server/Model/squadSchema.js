const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const squadSchema = Schema({
    name: { type: String },
    gamesPlayed: { type: Number },
    wins: { type: Number },
    draws: { type: Number },
    losses: { type: Number },
    gd: { type: Number },
    points: { type: Number },
    image: { type: String },

})

module.exports = mongoose.model("squad", squadSchema);