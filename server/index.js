const express = require("express");
const cors = require('cors');
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Import Routers
const HttpError = require("./Model/HttpError");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const teamRouter = require("./routes/teamRouter");
const playerRouter = require("./routes/playerRouter");
const leagueRouter = require("./routes/leagueRouter");
const squadRouter = require("./routes/squadRouter");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/team", teamRouter);
app.use("/api/player", playerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/league", leagueRouter);
app.use("/api/squad", squadRouter);

//for getting images
app.use('/uploads/images', express.static(path.join('uploads', 'images')))

//in case it could not find route
app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    return next(error);
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

//mongodb url
const uri = process.env.mongoURI || 'mongodb+srv://root:7ZJiz8k1InllMDjw@ifl.ckpe1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//connection to mongodb
mongoose
    .connect(`${uri}`)
    .then(() => {
        console.log("connected");
        app.listen(process.env.PORT || 5000);
    })
    .catch((err) => {
        console.log("error", err);
    });