const Order = require("../models/order.js");

module.exports.PlaceOrder = async(req, res)=>{
    let data = req.body;
    console.log(data);
    const newData = new Order(data.acceptOrder);
    const savedData = await newData.save();
    res.send("Order Placed Successfully");
}

module.exports.getPostOrder = async(req, res)=>{
    let data = req.params;
    console.log(data.PId, data.TId);
    let response = await Order.find({post: data.PId, trader: data.TId}).populate("farmer").exec();
    console.log(response);
    res.send(response);
}