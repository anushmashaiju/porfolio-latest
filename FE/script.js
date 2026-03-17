const BASE_URL = "https://porfolio-latest-1.onrender.com"

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

    // CV FETCH
    fetch(`${BASE_URL}/api/cv`)
        .then(res => res.json())
        .then(data => {
            if (data && data.url) {
                document.getElementById("cv-download").href = data.url
            }
        })
        .catch(error => console.log("CV Error:", error))


    // PROJECTS FETCH
    fetch(`${BASE_URL}/api/projects`)
        .then(res => res.json())
        .then(projects => {

            const container = document.getElementById("projects-container")
            container.innerHTML = ""

            projects.forEach(project => {

                container.innerHTML += `
<div class="col-md-6">
    <div class="project-card">

        <img src="${BASE_URL}/uploads/${project.image}" 
        style="width:100%;height:400px;object-fit:cover;margin:50px">

        <h3 style="padding:15px; text-align:center;">
            <a href="project.html?id=${project._id}">
                ${project.title}
            </a>
        </h3>

    </div>
</div>
`
            })
        })
        .catch(error => console.log("Projects Error:", error))


    // MINI PROJECTS FETCH
    fetch(`${BASE_URL}/api/miniprojects`)
        .then(res => res.json())
        .then(projects => {

            const container = document.getElementById("mini-project-container")
            container.innerHTML = ""

            projects.forEach(project => {

                container.innerHTML += `
<div class="col-md-6">
    <div class="blog-entry">

        <a href="${project.livelink}" class="block-20"
        style="background-image: url('${BASE_URL}/uploads/${project.image}');">
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
        .catch(error => console.log("Mini Projects Error:", error))


    // CONTACT FORM
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


// COUNTER SECTION

fetch(`${BASE_URL}/api/projects`)
.then(res => res.json())
.then(data => {
    document.getElementById("project-count").innerText = data.length
})

fetch(`${BASE_URL}/api/miniprojects`)
.then(res => res.json())
.then(data => {
    document.getElementById("mini-count").innerText = data.length
})