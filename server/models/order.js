const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    dealPrice: {
        type: Number,
        required: true
    },
    fromDelivery: {
        type: String,
        required: true
    },
    toDelivery: {
        type: String,
        required: true
    },
    trader: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    farmer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: "String"
    },
    
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;