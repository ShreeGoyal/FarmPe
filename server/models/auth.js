const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    userType:{
        type: String,
        required: true,
        enum: ["Trader", "Farmer"]
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User" , userSchema);