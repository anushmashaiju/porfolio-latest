const express = require("express")
const router = express.Router()
const multer = require("multer")
const Project = require("../models/project")


const storage = multer.diskStorage({
 destination: "uploads/",
 filename: (req, file, cb) => {
  cb(null, Date.now() + "-" + file.originalname)
 }
})

const upload = multer({ storage })


// GET ALL PROJECTS
router.get("/", async (req,res)=>{
const projects = await Project.find().sort({ createdAt: -1 })
res.json(projects)
})


// GET SINGLE PROJECT
router.get("/:id", async (req,res)=>{
try{

const project = await Project.findById(req.params.id)

if(!project){
return res.status(404).json({message:"Project not found"})
}

res.json(project)

}catch(err){

res.status(500).json({error:err.message})

}
})


// ADD PROJECT
router.post("/", upload.fields([
 { name: "image", maxCount: 1 },
 { name: "screenshot", maxCount: 1 }
]), async (req, res) => {

 const project = new Project({
  title: req.body.title,
  description: req.body.description,
  features: req.body.features,
  technologies: req.body.technologies,
  image: req.files.image[0].filename,
  screenshot: req.files.screenshot[0].filename,
  github: req.body.github,
  livelink: req.body.livelink,
  video: req.body.video,
  detailPage: req.body.detailPage
 })

 await project.save()

 res.json(project)
})


// DELETE PROJECT
router.delete("/:id", async(req,res)=>{

await Project.findByIdAndDelete(req.params.id)

res.json({message:"Deleted"})

})

//UPDATE PROJECT
router.put("/:id", upload.fields([
 { name: "image", maxCount: 1 },
 { name: "screenshot", maxCount: 1 }
]), async(req,res)=>{

const updateData = {
 title:req.body.title,
 github:req.body.github,
 video:req.body.video,
 livelink:req.body.livelink,
 description:req.body.description,
 features:req.body.features,
 technologies:req.body.technologies
}

if(req.files.image){
 updateData.image = req.files.image[0].filename
}

if(req.files.screenshot){
 updateData.screenshot = req.files.screenshot[0].filename
}

const project = await Project.findByIdAndUpdate(
 req.params.id,
 updateData,
 {new:true}
)

res.json(project)

})

module.exports = router