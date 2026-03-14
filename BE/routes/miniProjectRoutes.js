const express = require("express")
const router = express.Router()
const multer = require("multer")
const MiniProject = require("../models/miniProject")

const storage = multer.diskStorage({
destination:(req,file,cb)=>{
cb(null,"uploads/")
},
filename:(req,file,cb)=>{
cb(null, Date.now()+"-"+file.originalname)
}
})

const upload = multer({storage})

// GET ALL MINI PROJECTS
router.get("/", async(req,res)=>{
const projects = await MiniProject.find().sort({ createdAt: -1 })
res.json(projects)
})

// GET SINGLE MINI PROJECT
router.get("/:id", async (req, res) => {
  try {

    const project = await MiniProject.findById(req.params.id)

    res.json(project)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }
})
// ADD MINI PROJECT
router.post("/", upload.single("image"), async(req,res)=>{

const project = new MiniProject({
title:req.body.title,
image:req.file.filename,
github:req.body.github,
livelink:req.body.livelink
})

await project.save()

res.json(project)

})

// UPDATE MINI PROJECT
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
// DELETE
router.delete("/:id", async(req,res)=>{
await MiniProject.findByIdAndDelete(req.params.id)
res.json({message:"Deleted"})
})

module.exports = router