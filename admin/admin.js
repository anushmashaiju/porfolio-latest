const BASE_URL = "https://porfolio-latest-1.onrender.com"


//  LOAD PROJECTS 
function loadProjects() {

    fetch(`${BASE_URL}/api/projects`)
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById("project-list")
            container.innerHTML = ""

            data.forEach(p => {

                container.innerHTML += `
                <div class="project-card">

                    <div>
                        <strong>${p.title}</strong>
                    </div>

                    <div>
                        <button onclick="editProject('${p._id}')">Edit</button>

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


//  ADD / UPDATE PROJECT 
let editId = null

function addProject() {

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

    if (image) formData.append("image", image)
    if (screenshot) formData.append("screenshot", screenshot)

    formData.append("github", github)
    formData.append("livelink", livelink)
    formData.append("video", video)
    formData.append("description", description)
    formData.append("features", features)
    formData.append("technologies", technologies)

    let url = `${BASE_URL}/api/projects`
    let method = "POST"

    if (editId) {
        url = `${BASE_URL}/api/projects/${editId}`
        method = "PUT"
    }

    fetch(url, {
        method: method,
        body: formData
    })
        .then(res => res.json())
        .then(() => {

            alert(editId ? "Project Updated" : "Project Added")

            editId = null

            loadProjects()
        })
}


//  DELETE PROJECT 
function deleteProject(id) {

    fetch(`${BASE_URL}/api/projects/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            loadProjects()
        })
}


//  EDIT PROJECT 
function editProject(id) {

    fetch(`${BASE_URL}/api/projects/${id}`)
        .then(res => res.json())
        .then(data => {

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


//  UPLOAD CV 
function uploadCV() {

    const file = document.getElementById("cvFile").files[0]

    const formData = new FormData()
    formData.append("cv", file)

    fetch(`${BASE_URL}/api/cv`, {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(() => {
            alert("CV Uploaded")
        })
}


// ================== MINI PROJECTS ==================
let miniEditId = null


function loadMiniProjects() {

    fetch(`${BASE_URL}/api/miniprojects`)
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById("mini-list")
            container.innerHTML = ""

            data.forEach(p => {

                container.innerHTML += `
                <div class="project-card">

                    <div>
                        <strong>${p.title}</strong>
                    </div>

                    <div>
                        <button onclick="editMiniProject('${p._id}')">Edit</button>

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


function addMiniProject() {

    const title = document.getElementById("miniTitle").value
    const image = document.getElementById("miniImage").files[0]
    const github = document.getElementById("miniGithub").value
    const livelink = document.getElementById("miniLive").value

    const formData = new FormData()

    formData.append("title", title)
    if (image) formData.append("image", image)

    formData.append("github", github)
    formData.append("livelink", livelink)

    let url = `${BASE_URL}/api/miniprojects`
    let method = "POST"

    if (miniEditId) {
        url = `${BASE_URL}/api/miniprojects/${miniEditId}`
        method = "PUT"
    }

    fetch(url, {
        method: method,
        body: formData
    })
        .then(() => {

            alert(miniEditId ? "Mini Project Updated" : "Mini Project Added")

            miniEditId = null

            loadMiniProjects()
        })
}


function deleteMini(id) {

    fetch(`${BASE_URL}/api/miniprojects/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            loadMiniProjects()
        })
}


function editMiniProject(id) {

    fetch(`${BASE_URL}/api/miniprojects/${id}`)
        .then(res => res.json())
        .then(data => {

            document.getElementById("miniTitle").value = data.title
            document.getElementById("miniGithub").value = data.github
            document.getElementById("miniLive").value = data.livelink

            miniEditId = id
        })
}

function addExperience() {

    const role = document.getElementById("role").value
    const company = document.getElementById("company").value
    const year = document.getElementById("year").value
    const certificate = document.getElementById("certificate").files[0]

    const formData = new FormData()

    formData.append("role", role)
    formData.append("company", company)
    formData.append("year", year)
    formData.append("certificate", certificate)

    fetch(`${BASE_URL}/api/experience`, {
    method: "POST",
    body: formData
})
.then(res => res.json())
.then(data => {
    alert(data.message || "Experience Added")
})
.catch(err => {
    console.error("Error:", err)
    alert("Failed to add experience")
})
}