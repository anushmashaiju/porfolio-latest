# 🌐 Personal Portfolio Website

Hi, I'm Anushma Radhakrishnan
This is my **full-stack portfolio website** where I showcase my projects, skills, and allow users to view my work dynamically.

---

## 🚀 Live Links

* 🌐 **Frontend (Live Site):**
  https://portfoliolatestfe.netlify.app/

* ⚙️ **Backend (API Server):**
  https://porfolio-latest-1.onrender.com

---

## 📌 Features

✨ Dynamic project listing (fetched from backend)
✨ Individual project detail pages
✨ Admin panel to add/update projects
✨ CV upload & download system
✨ Contact form with backend integration
✨ Mini projects section
✨ Loading states (server wake-up handling)
✨ Fully responsive UI

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap
* Toastify (for notifications)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Multer (for file uploads)

---

## 📂 Project Structure

```
/frontend
  ├── index.html
  ├── project.html
  ├── css/
  ├── js/

/backend
  ├── models/
  ├── routes/
  ├── uploads/
  ├── server.js
```

---

## ⚙️ How It Works

1. Frontend (Netlify) sends API requests
2. Backend (Render) handles:

   * Projects
   * Mini Projects
   * CV Upload
   * Contact Form
3. Data is stored in MongoDB
4. Images & files are served from backend `/uploads`

---

## 🔄 Deployment

### Frontend (Netlify)

* Connected to GitHub
* Auto-deploy on every push

### Backend (Render)

* Connected to GitHub
* Auto-deploy enabled
* Free tier (may take a few seconds to wake up ⏳)

---

## ⚠️ Notes

* Backend may take **5–10 seconds to wake up** (Render free tier)
* Loading messages are implemented to handle this
* All API URLs use production backend (no localhost)

---

## 📬 Contact

If you'd like to connect:

* Portfolio: https://portfoliolatestfe.netlify.app/
* GitHub: https://github.com/anushmashaiju/porfolio-latest.git

---



## ⭐ Acknowledgement

This project was built as part of my learning journey in **Full Stack Development** 🚀

---

## ❤️ Thank You

If you like this project, feel free to ⭐ the repository!
