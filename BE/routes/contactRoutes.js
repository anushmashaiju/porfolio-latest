const express = require("express")
const router = express.Router()
const Contact = require("../models/contact")
const nodemailer = require("nodemailer")

router.post("/", async (req,res)=>{

const {name,email,subject,message} = req.body

// Save to database
const newMessage = new Contact({
name,
email,
subject,
message
})

await newMessage.save()

// Send Email
const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:"anushma2015@gmail.com",
pass:"gdzrsjqtwmphajgq"
}
})

const mailOptions = {
from:email,
to:"anushma2015@gmail.com",
subject:`Portfolio Contact: ${subject}`,
text:`Name: ${name}
Email: ${email}
Message: ${message}`
}

await transporter.sendMail(mailOptions)

res.json({message:"Message sent successfully"})

})

module.exports = router