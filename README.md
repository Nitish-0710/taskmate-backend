# TaskMate Backend 🧠⚙️

Backend service for **TaskMate**, a Kanban-style task management web application.

This backend is built with **Node.js, Express, MongoDB**, and uses **session-based authentication with cookies** (not JWT), making it closer to real-world production systems.

Frontend is deployed separately on **Netlify**.

---

## 🚀 Features

- User authentication (Register / Login / Logout)
- Session-based auth using `express-session`
- Secure HTTP-only cookies
- Protected routes with middleware
- CRUD operations for Kanban tasks
- MongoDB Atlas integration
- Global 401 handling support (frontend)
- Environment-based configuration (dev / prod ready)

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB Atlas**
- **Mongoose**
- **express-session**
- **bcrypt**
- **CORS**
- **dotenv**

---

## 📂 Project Structure

```

backend/
├── controllers/
│   ├── authController.js
│   └── kanbanController.js
├── models/
│   ├── User.js
│   └── KanbanTask.js
├── routes/
│   ├── authRouter.js
│   └── kanbanRouter.js
├── src/
│   ├── app.js
│   └── config/
│       └── session.js
├── .env
├── package.json
└── README.md

````

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
NODE_ENV=development

SESSION_SECRET=your-strong-secret-key
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<database>
````

> ⚠️ Never commit `.env` to GitHub.

---

## ▶️ Running Locally

```bash
npm install
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## 🌐 CORS Configuration

This backend is configured to work with:

* Local frontend (`http://localhost:5173`)
* Netlify deployed frontend [https://taskmate-kanban.netlify.app/](https://taskmate-kanban.netlify.app/)

Cookies are enabled using:

* `credentials: true`
* `sameSite` and `secure` adjusted per environment

---

## 🔒 Authentication Flow

* Sessions stored server-side
* Session ID stored in HTTP-only cookie
* `/api/auth/me` used to verify logged-in user
* Protected routes require active session

---

## 🚢 Deployment

This backend is deployed on **Render**.

Production requirements:

* `NODE_ENV=production`
* `sameSite=none`
* `secure=true`
* HTTPS required for cookies

---

## 📌 Frontend Repository

Frontend (React + Vite) is deployed separately on Netlify.

➡️ [https://github.com/Nitish-0710/taskmate-frontend](https://github.com/Nitish-0710/taskmate-frontend)

---

## 👤 Author

**Nitish Sahu**
B.Tech CSE (AI), VIT Pune

---


