import mongoose from "mongoose"

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  year: String,
  certificate: String
})

export default mongoose.model("Experience", experienceSchema)