const mongoose = require("mongoose")

const cvSchema = new mongoose.Schema({

url:String

})

module.exports = mongoose.model("CV", cvSchema)