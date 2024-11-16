const User = require("../models/auth.js");
const passport = require("passport");

module.exports.Login = async (req, res) => {
    res.status(200);
    const username = req.body.username;
    const userData = await User.findOne({ username: username }).exec();
    res.send({ userData });
}

module.exports.LoginFailed = async (req, res) => {
    console.log("Login Failed");
    res.json({ success: false, message: 'User Not Logged in successfully' });
}

module.exports.signup = async (req, res, next) => {
    try {
        const { name, username, password, email } = req.body.registerData;
        const { userType } = req.body;
        const newUser = new User({ name: name, email: email, username: username, userType: userType });
        User.register(newUser, password, (err, user) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.send("Problem while signing up");
            }
            passport.authenticate('local')(req, res, () => {
                res.status(200);
                res.send("Signup Successfull");
            });
        });
        // req.login(registeredUser, (err) => {
        //     if (err) {
        //         return next(err);
        //     }
        //     res.send("SignUp Successfull");
        // });
        // res.send("Signup successfully");
    } catch (e) {
        res.send("Error in Signup");
    }
}

module.exports.Logout = async (req, res) => {
    req.logout();
    res.status(200);
    res.send("Logout Successfully");
}