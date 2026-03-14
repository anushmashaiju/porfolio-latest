const mongoose = require("mongoose")

const miniProjectSchema = new mongoose.Schema({

title:String,
image:String,
github:String,
livelink:String

},{
timestamps:true
})

module.exports = mongoose.model("MiniProject", miniProjectSchema)