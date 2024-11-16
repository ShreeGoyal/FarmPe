if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const http = require('http');
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");
const postRouter = require("./routes/home.js");
const authRouter = require("./routes/auth.js");
const orderRouter = require("./routes/order.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/auth.js");
const mongoStore = require("connect-mongo");
const cookieParser = require('cookie-parser');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const mongoURL = process.env.MONGOURL;
const store = mongoStore.create({
    mongoUrl: mongoURL,
    crypto: {
        secret: process.env.SESSIONSECRET
    },
    touchAfter: 24 * 3600
})

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
})

async function main() {
    await mongoose.connect(mongoURL);
}

main().then(() => { console.log("Connection to Database is Successfull") }).catch(() => { console.log("Error in connecting Database") });

const sessionOptions = {
    store,
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
app.use("/home", postRouter);
app.use("/api/auth", authRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
    console.log("Server is Running fine");
    res.send("Server is Working fine");
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "muditsingh04@gmail.com",
//         username: "singhmuditF",
//         name: "Mudit Singh",
//         userType: "Farmer"
//     });

//     let registeredUser = await User.register(fakeUser, "abc");
//     res.send(registeredUser);
// });

server.listen(port, () => {
    console.log(`App is listening at ${port}`);
});