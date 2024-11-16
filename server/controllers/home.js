const Post = require("../models/post");

module.exports.home = async(req, res)=>{
    const allPost = await Post.find({}).populate("owner").exec();
    res.send(allPost);
}

module.exports.deletePost = async(req, res)=>{
    let {id} = req.params;
    const response = await Post.findOneAndDelete({_id: id});
    res.send("Deleted Successfully");
}

module.exports.editPost = async(req, res)=>{
    let {id} = req.params;
    let {data} = req.body;
    await Post.findByIdAndUpdate(id , data);
    res.send("Edited Successfully");
}

module.exports.newPost = async(req, res)=>{
    let data = req.body;
    const newData = new Post(data.data);
    const savedData = await newData.save();
    res.send("Successfull Addition");
}

module.exports.searchPost = async(req, res)=>{
    let {value} = req.params;
    console.log(value);
    const searchedData = await Post.find({title: {$regex: value}}).populate("owner").exec();
    res.send({searchedData});
}