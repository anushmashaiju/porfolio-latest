const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({

title:String,
image:String,
detailPage:String,
github:String,
livelink:String,
video:String,
description:String,
features:String,
technologies:String,
screenshot: String,

},{
timestamps:true
})

module.exports = mongoose.model("Project", projectSchema)