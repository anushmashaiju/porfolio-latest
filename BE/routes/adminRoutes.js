const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const ADMIN_EMAIL = "admin@gmail.com"
const ADMIN_PASS = "123456"

router.post("/login",(req,res)=>{

 const {email,password} = req.body

 if(email === ADMIN_EMAIL && password === ADMIN_PASS){

  const token = jwt.sign({admin:true},"secretkey")

  res.json({token})

 }else{

  res.status(401).json({message:"Invalid credentials"})

 }

})

module.exports = router