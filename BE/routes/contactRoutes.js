const express = require("express")
const router = express.Router()
const Contact = require("../models/contact")
const nodemailer = require("nodemailer")

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    const newMessage = new Contact({ name, email, subject, message })
    await newMessage.save()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}
Email: ${email}
Message: ${message}`
    }

    await transporter.sendMail(mailOptions)

    res.json({ message: "Message sent successfully" })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
})

module.exports = router