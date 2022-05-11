const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerschema = Schema({
    name: { type: String },
    image: { type: String },
    position: { type: String },
    team: { type: String },
    points: { type: String },
})

module.exports = mongoose.model("player", playerschema);