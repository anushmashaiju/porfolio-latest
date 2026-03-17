const mongoose = require("mongoose")

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  year: String,
  certificate: String
})

module.exports = mongoose.model("Experience", experienceSchema)