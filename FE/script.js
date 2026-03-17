
const BASE_URL = "https://porfolio-latest-1.onrender.com"

// TOAST FUNCTION
function showToast(message, type = "success") {
    let color = "#28a745"

    if (type === "error") {
        color = "#dc3545"
    }

    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: color
        }
    }).showToast()
}

document.addEventListener("DOMContentLoaded", function () {

    //  CV FETCH 
    fetch(`${BASE_URL}/api/cv`)
        .then(res => res.json())
        .then(data => {
            if (data && data.url) {
                document.getElementById("cv-download").href = data.url
            }
        })
        .catch(error => console.log("CV Error:", error))


    //  PROJECTS FETCH 

    const projectContainer = document.getElementById("projects-container")

    // Show loading first
    projectContainer.innerHTML = `
        <div style="text-align:center; padding:40px;">
            <p>⚡ Loading projects...</p>
        </div>
    `

    // Show "server waking" after 5 sec
    setTimeout(() => {
        if (projectContainer.innerHTML.includes("Loading")) {
            projectContainer.innerHTML = `
                <div style="text-align:center; padding:40px;">
                    <p>⏳ Server is waking up... please wait a few seconds</p>
                </div>
            `
        }
    }, 5000)

    fetch(`${BASE_URL}/api/projects`)
        .then(res => res.json())
        .then(projects => {

            projectContainer.innerHTML = ""

            projects.forEach(project => {
        projectContainer.innerHTML += `
<div class="col-md-6">
    <a href="project.html?id=${project._id}" style="text-decoration:none; color:black;">
        <div class="project-card" style="cursor:pointer">

            <img src="${BASE_URL}/uploads/${project.image}" 
            style="width:100%;height:400px;object-fit:cover;margin:50px">

          <h3 class="project-title">
    ${project.title} ↗
</h3>

        </div>
    </a>
</div>
`
            })
        })
        .catch(error => {
            console.log("Projects Error:", error)
            projectContainer.innerHTML = `
                <div style="text-align:center; padding:40px;">
                    <p>❌ Failed to load projects. Please try again.</p>
                </div>
            `
        })


    //  MINI PROJECTS FETCH 

    const miniContainer = document.getElementById("mini-project-container")

    miniContainer.innerHTML = `
        <div style="text-align:center; padding:40px;">
            <p>⚡ Loading mini projects...</p>
        </div>
    `

    fetch(`${BASE_URL}/api/miniprojects`)
        .then(res => res.json())
        .then(projects => {

            miniContainer.innerHTML = ""

            projects.forEach(project => {
                miniContainer.innerHTML += `
                <div class="col-md-6">
                    <div class="blog-entry">

                        <a href="${project.livelink}" class="block-20"
                        style="background-image: url('${BASE_URL}/uploads/${project.image}')">
                        </a>

                        <div class="text mt-3 mb-3 float-right d-block">
                            <h3 class="heading">
                                <a href="${project.github}">
                                    ${project.title}
                                </a>
                            </h3>
                        </div>

                    </div>
                </div>
                `
            })
        })
        .catch(error => {
            console.log("Mini Projects Error:", error)
            miniContainer.innerHTML = `
                <div style="text-align:center; padding:40px;">
                    <p>❌ Failed to load mini projects.</p>
                </div>
            `
        })


    //  CONTACT FORM 

    const contactForm = document.getElementById("contact-form")

    if (contactForm) {

        contactForm.addEventListener("submit", async function (e) {

            e.preventDefault()

            let name = document.getElementById("name").value.trim()
            let email = document.getElementById("email").value.trim()
            let subject = document.getElementById("subject").value.trim()
            let message = document.getElementById("message").value.trim()

            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            // VALIDATION
            if (name === "") {
                showToast("Name required", "error")
                return
            }

            if (!emailPattern.test(email)) {
                showToast("Invalid email", "error")
                return
            }

            if (subject.length < 5) {
                showToast("Subject too short", "error")
                return
            }

            if (message.length < 10) {
                showToast("Message too short", "error")
                return
            }

            const formData = { name, email, subject, message }

            try {
                const res = await fetch(`${BASE_URL}/api/contact`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })

                const data = await res.json()

                showToast(data.message, "success")
                contactForm.reset()

            } catch (error) {
                console.log("Contact Error:", error)
                showToast("Something went wrong. Please try again.", "error")
            }

        })
    }

})


//  COUNTER SECTION 

// Projects count
fetch(`${BASE_URL}/api/projects`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("project-count").innerText = data.length
    })

// Mini projects count
fetch(`${BASE_URL}/api/miniprojects`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("mini-count").innerText = data.length
    })

// EXPERIENCE FETCH 

const experienceContainer = document.getElementById("experience-container")

if (experienceContainer) {

    experienceContainer.innerHTML = `
        <div style="text-align:center; padding:40px;">
            <p>⚡ Loading experience...</p>
        </div>
    `

    setTimeout(() => {
        if (experienceContainer.innerHTML.includes("Loading")) {
            experienceContainer.innerHTML = `
                <div style="text-align:center; padding:40px;">
                    <p>⏳ Server is waking up... please wait</p>
                </div>
            `
        }
    }, 5000)

    fetch(`${BASE_URL}/api/experience`)
        .then(res => res.json())
        .then(data => {

            experienceContainer.innerHTML = ""

            data.forEach(exp => {

                experienceContainer.innerHTML += `
                <div class="col-md-6">
                    <div class="project-card" style="cursor:pointer"
                         onclick="openCertificate('${BASE_URL}/uploads/${exp.certificate}')">

                        <h3>${exp.role}</h3>
                        <p><strong>${exp.company}</strong></p>
                        <p>${exp.year}</p>

                        <p style="color:#ffbd39;">View Certificate ↗</p>

                    </div>
                </div>
                `
            })
        })
        .catch(() => {
            experienceContainer.innerHTML = `
                <p style="text-align:center;">❌ Failed to load experience</p>
            `
        })
}


// OPEN CERTIFICATE
function openCertificate(url) {
    window.open(url, "_blank")
}