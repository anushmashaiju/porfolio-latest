const express = require("express")
const multer = require("multer")
const Experience = require("../models/experience")

const router = express.Router()

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage })

// ADD EXPERIENCE
router.post("/", upload.single("certificate"), async (req, res) => {
  const newExp = new Experience({
    role: req.body.role,
    company: req.body.company,
    year: req.body.year,
    certificate: req.file.filename
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