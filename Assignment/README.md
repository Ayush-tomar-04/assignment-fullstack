# 📋 Project & Task Management App

A full-stack web application where users can create projects, assign tasks, and track progress with role-based access control (Admin/Member).

## 🚀 Live Demo

- **Frontend:** https://robust-solace-production-ec4d.up.railway.app
- **Backend API:** https://assignment-fullstack-production.up.railway.app

## 📦 GitHub Repository

https://github.com/Ayush-tomar-04/assignment-fullstack

---

## ✨ Features

- 🔐 **Authentication** — Signup & Login with JWT tokens
- 👥 **Role-Based Access Control** — Admin and Member roles
- 📁 **Project Management** — Create and manage projects with team members
- ✅ **Task Management** — Create, assign, and track tasks
- 📊 **Dashboard** — View tasks by status, overdue tasks, and progress
- 🔒 **Protected Routes** — Pages secured based on user role

---

## 🛠️ Tech Stack

### Frontend
- React.js (Create React App)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

### Deployment
- Railway (Backend + Frontend)
- MongoDB Atlas (Database)

---

## ⚙️ API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/signup` | Register a new user |
| POST | `/api/v1/login` | Login and get JWT token |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects` | Get all projects |
| POST | `/api/v1/projects` | Create a new project |
| GET | `/api/v1/projects/:id` | Get project by ID |
| PUT | `/api/v1/projects/:id` | Update project |
| DELETE | `/api/v1/projects/:id` | Delete project |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tasks` | Get all tasks |
| POST | `/api/v1/tasks` | Create a new task |
| GET | `/api/v1/tasks/:id` | Get task by ID |
| PUT | `/api/v1/tasks/:id` | Update task status |
| DELETE | `/api/v1/tasks/:id` | Delete task |

---

## 🏃 Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup
```bash
# Clone the repo
git clone https://github.com/Ayush-tomar-04/assignment-fullstack.git

# Go to backend folder
cd Assignment/Backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your MONGO_URL and JWT_SECRET in .env

# Start the server
npm run dev
```

### Frontend Setup
```bash
# Go to frontend folder
cd Assignment/frontend

# Install dependencies
npm install

# Create .env file and add:
# REACT_APP_API_URL=http://localhost:4000/api/v1

# Start the app
npm start
```

---

## 🌐 Deployment

Both frontend and backend are deployed on **Railway**.

- Backend root directory: `Assignment/Backend`
- Frontend root directory: `Assignment/frontend`

### Environment Variables (Backend)
| Key | Description |
|-----|-------------|
| `MONGO_URL` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `NODE_ENV` | Set to `production` |

### Environment Variables (Frontend)
| Key | Description |
|-----|-------------|
| `REACT_APP_API_URL` | Backend API base URL |

---

## 📁 Project Structure

```
assignment-fullstack/
├── Assignment/
│   ├── Backend/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── Controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   │   ├── user.js
│   │   │   ├── project.js
│   │   │   └── task.js
│   │   ├── index.js
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── services/
│       ├── serve.js
│       └── package.json
```

---

## 👤 Author

- **GitHub:** [Ayush-tomar-04](https://github.com/Ayush-tomar-04)