const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    amountRequired: {
        type: Number,
        required: true
    },
    image: {
        url: String,
        filename: String    
    },
    price: Number,
    location: String,
    country: String,
    owner: {
        type:Schema.Types.ObjectId,
        ref: "User"
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;