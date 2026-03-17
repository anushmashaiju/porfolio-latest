const express = require("express")
const router = express.Router()
const multer = require("multer")
const CV = require("../models/CV")

const BASE_URL = "https://porfolio-latest-1.onrender.com"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/cv")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage })

// UPLOAD CV
router.post("/", upload.single("cv"), async (req, res) => {

    const fileUrl = BASE_URL + "/uploads/cv/" + req.file.filename

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