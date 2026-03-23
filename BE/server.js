const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const projectRoutes = require("./routes/projectRoutes")
const adminRoutes = require("./routes/adminRoutes")
const cvRoutes = require("./routes/cvRoutes")
const miniProjectRoutes = require("./routes/miniProjectRoutes")
const contactRoutes = require("./routes/contactRoutes")
const experienceRoutes = require("./routes/experience")
const path = require("path")
const app = express()
require("dotenv").config()

app.use(cors())
app.use(express.json())

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err))


app.use("/api/projects", projectRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/cv", cvRoutes)
app.use("/api/miniprojects", miniProjectRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/experience", experienceRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000")
})

