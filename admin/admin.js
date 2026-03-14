function loadProjects(){

fetch("http://localhost:5000/api/projects")
.then(res=>res.json())
.then(data=>{

const container = document.getElementById("project-list")

container.innerHTML=""

data.forEach(p=>{

container.innerHTML+=`

<div class="project-card">

<div>
<strong>${p.title}</strong>
</div>

<div>

<button onclick="editProject('${p._id}')">
Edit
</button>

<button class="delete-btn" onclick="deleteProject('${p._id}')">
Delete
</button>

</div>

</div>

`

})

})

}

loadProjects()



function addProject(){

const title = document.getElementById("title").value
const image = document.getElementById("image").files[0]
const screenshot = document.getElementById("screenshot").files[0]
const github = document.getElementById("github").value
const livelink = document.getElementById("livelink").value
const video = document.getElementById("video").value
const description = document.getElementById("description").value
const features = document.getElementById("features").value
const technologies = document.getElementById("technologies").value

const formData = new FormData()

formData.append("title", title)
if(image){
formData.append("image", image)
}

if(screenshot){
formData.append("screenshot", screenshot)
}
formData.append("github", github)
formData.append("livelink", livelink)
formData.append("video", video)
formData.append("description", description)
formData.append("features", features)
formData.append("technologies", technologies)

let url = "http://localhost:5000/api/projects"
let method = "POST"

if(editId){
url = `http://localhost:5000/api/projects/${editId}`
method = "PUT"
}

fetch(url,{
method:method,
body:formData
})
.then(res=>res.json())
.then(()=>{

alert(editId ? "Project Updated" : "Project Added")

editId = null

loadProjects()

})

}

function deleteProject(id){

fetch(`http://localhost:5000/api/projects/${id}`,{

method:"DELETE"

})
.then(()=>{

loadProjects()

})

}



function uploadCV(){

const file = document.getElementById("cvFile").files[0]

const formData = new FormData()

formData.append("cv",file)

fetch("http://localhost:5000/api/cv",{

method:"POST",

body:formData

})
.then(res=>res.json())
.then(()=>{

alert("CV Uploaded")

})

}

let editId = null

function editProject(id){

fetch(`http://localhost:5000/api/projects/${id}`)
.then(res=>res.json())
.then(data=>{

document.getElementById("title").value = data.title
document.getElementById("github").value = data.github
document.getElementById("video").value = data.video
document.getElementById("livelink").value = data.livelink
document.getElementById("description").value = data.description
document.getElementById("features").value = data.features
document.getElementById("technologies").value = data.technologies

editId = id

})

}

function loadMiniProjects(){

fetch("http://localhost:5000/api/miniprojects")
.then(res=>res.json())
.then(data=>{

const container = document.getElementById("mini-list")

container.innerHTML=""

data.forEach(p=>{

container.innerHTML+=`

<div class="project-card">

<div>
<strong>${p.title}</strong>
</div>

<div>

<button onclick="editMiniProject('${p._id}')">
Edit
</button>

<button class="delete-btn" onclick="deleteMini('${p._id}')">
Delete
</button>

</div>

</div>

`

})

})

}

loadMiniProjects()

function addMiniProject(){

const title = document.getElementById("miniTitle").value
const image = document.getElementById("miniImage").files[0]
const github = document.getElementById("miniGithub").value
const livelink = document.getElementById("miniLive").value

const formData = new FormData()

formData.append("title", title)
formData.append("image", image)
formData.append("github", github)
formData.append("livelink", livelink)

let url = "http://localhost:5000/api/miniprojects"
let method = "POST"

if(miniEditId){
url = `http://localhost:5000/api/miniprojects/${miniEditId}`
method = "PUT"
}

fetch(url,{
method:method,
body:formData
})
.then(()=>{

alert(miniEditId ? "Mini Project Updated" : "Mini Project Added")

miniEditId = null

loadMiniProjects()

})

}

function deleteMini(id){

fetch(`http://localhost:5000/api/miniprojects/${id}`,{
method:"DELETE"
})
.then(()=>{

loadMiniProjects()

})

}

let miniEditId = null

function editMiniProject(id){

fetch(`http://localhost:5000/api/miniprojects/${id}`)
.then(res=>res.json())
.then(data=>{

document.getElementById("miniTitle").value = data.title
document.getElementById("miniGithub").value = data.github
document.getElementById("miniLive").value = data.livelink

miniEditId = id

})

}