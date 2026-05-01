## Live URL
[https://devoted-radiance-production-647e.up.railway.app/](https://devoted-radiance-production-647e.up.railway.app/)

# TaskFlow — Team Task Manager

A full-stack team task management app built with React, Node.js, Express, and MySQL.

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | ^18.2.0 | UI framework |
| React Router DOM | ^6.15.0 | Client-side routing |
| Axios | ^1.5.0 | HTTP requests to backend |
| Vite | ^5.0.0 | Build tool and dev server |
| CSS Modules | — | Component-scoped styles |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | ≥18.x | Runtime |
| Express | ^4.18.2 | HTTP server and routing |
| mysql2 | ^3.6.0 | MySQL driver (promise-based) |
| bcryptjs | ^2.4.3 | Password hashing |
| jsonwebtoken | ^9.0.0 | JWT-based authentication |
| dotenv | ^16.0.3 | Environment variable management |
| cors | ^2.8.5 | Cross-origin request handling |

### Database
- **MySQL** (any version ≥ 5.7 or MySQL 8.x)
- Tables are auto-created on server startup via `initDB()` — no manual migration needed.

---

## Features

- User registration and login with JWT authentication (7-day token expiry)
- Create and manage projects
- Add / remove project members by email (admin-only)
- Role-based access: `admin` (full CRUD) and `member` (can only update status of tasks assigned to them)
- Create, update, and delete tasks with title, description, due date, priority (`low` / `medium` / `high`), and status (`todo` / `inprogress` / `done`)
- Assign tasks to project members
- Dashboard with aggregated stats: total tasks, by status, overdue count, and tasks per assignee
- React frontend served statically from Express in production
- Health check endpoint at `/api/health`

---

## Folder Structure

```
taskflow/
├── package.json                  # Root package (start script only)
├── .gitignore
├── railway.toml                  # Railway deployment config
│
├── server/                       # Express backend
│   ├── index.js                  # App entry point — starts server, serves React build
│   ├── db.js                     # MySQL pool, query helper, initDB (auto-creates tables)
│   ├── package.json              # Backend dependencies
│   ├── .env.example              # Environment variable template
│   ├── middleware/
│   │   └── auth.js               # JWT verification middleware
│   └── routes/
│       ├── auth.js               # POST /api/auth/signup, POST /api/auth/login
│       ├── projects.js           # CRUD for projects + member management
│       └── tasks.js              # CRUD for tasks + dashboard stats
│
└── client/                       # React + Vite frontend
    ├── index.html                # HTML entry
    ├── vite.config.js            # Vite config — proxies /api → localhost:8080
    ├── package.json              # Frontend dependencies
    └── src/
        ├── main.jsx              # ReactDOM render root
        ├── App.jsx               # Route definitions + Protected/Guest wrappers
        ├── index.css             # Global styles
        ├── api/
        │   └── index.js          # Axios instance with base URL
        ├── context/
        │   └── AuthContext.jsx   # Auth state (user, token) via React Context
        ├── components/
        │   ├── Layout.jsx        # Sidebar + Outlet wrapper
        │   └── Layout.css
        └── pages/
            ├── Login.jsx         # Login form
            ├── Register.jsx      # Registration form
            ├── Dashboard.jsx     # Stats overview
            ├── Dashboard.css
            ├── Projects.jsx      # Project list + create project
            ├── Projects.css
            ├── ProjectDetail.jsx # Task board + member management
            ├── ProjectDetail.css
            └── Auth.css
```

---

## Deployment Guide

### Deploy on Railway (Recommended)

The project includes a `railway.toml` with a pre-configured build and start command.

1. Push the project to a GitHub repository.

2. Go to [railway.app](https://railway.app) and create a new project.

3. Click **"Deploy from GitHub repo"** and select your repository.

4. Add a **MySQL** plugin from the Railway dashboard. Railway will auto-provision a MySQL instance and give you a `DATABASE_URL`.

5. In your Railway service's **Variables** tab, add:

```
JWT_SECRET=your_random_secret
NODE_ENV=production
CLIENT_URL=https://your-railway-domain.up.railway.app
```

6. Railway will automatically run:
   - Build: `cd client && npm install && npm run build && cd ../server && npm install`
   - Start: `cd server && node index.js`

7. Your app will be live at the Railway-provided URL.

---

---

## Clone Guide

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow

# 2. Set up backend env
cd server
cp .env.example .env
# Edit .env with your MySQL credentials

# 3. Install backend deps
npm install

# 4. Install frontend deps
cd ../client
npm install

# 5. Create the MySQL database
# Run in MySQL: CREATE DATABASE taskflow;

# 6. Start the backend
cd ../server
npm run dev

# 7. In a new terminal, start the frontend
cd client
npm run dev

# App available at http://localhost:5173
```

---
## Notes

- In production, the React build (`client/dist`) is served as static files by Express. There is no need to run the Vite dev server.
- The database tables are created automatically on server startup — no migration tool is needed.
- JWT tokens expire after **7 days**. Adjust in `routes/auth.js` if needed.
- Task creation and deletion are restricted to project **admins**. Regular members can only change the `status` of tasks assigned directly to them.
