const express = require("express")
const router = express.Router()
const multer = require("multer")
const CV = require("../models/CV")


// ✅ ADD THIS
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

// ✅ CONFIG CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// ✅ STORAGE (REPLACES diskStorage)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "cv",
    resource_type: "raw" // important for PDF
  }
})

const upload = multer({ storage })

// UPLOAD CV
router.post("/", upload.single("cv"), async (req, res) => {

    const fileUrl = req.file.path   // ✅ cloudinary URL

    await CV.deleteMany()

    const cv = new CV({
        url: fileUrl
    })

    await cv.save()

    res.json(cv)
})

// GET CV
router.get("/", async (req, res) => {
    const cv = await CV.findOne()
    res.json(cv)
})

module.exports = router