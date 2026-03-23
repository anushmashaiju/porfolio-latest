const express = require("express")
const router = express.Router()
const multer = require("multer")
const Experience = require("../models/experience")

const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

// CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// STORAGE
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "experience",
    resource_type: "raw" // important for PDF
  }
})

const upload = multer({ storage })

// ADD EXPERIENCE
router.post("/", upload.single("certificate"), async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: "Certificate file required" })
  }

  const newExp = new Experience({
    role: req.body.role,
    company: req.body.company,
    year: req.body.year,
    certificate: req.file.path
  })

  await newExp.save()

  res.json({ message: "Experience added" })
})

// GET ALL
router.get("/", async (req, res) => {
  const data = await Experience.find()
  res.json(data)
})

module.exports = router