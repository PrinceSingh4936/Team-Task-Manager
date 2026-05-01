# TaskFlow — Team Task Manager

A full-stack team task management app built with React, Node.js, Express, and MySQL.

## Features
- JWT Authentication (Signup / Login)
- Create & manage projects
- Role-based access (Admin / Member)
- Kanban board (To Do / In Progress / Done)
- Task assignment, priorities, due dates
- Dashboard with stats
- Add/remove team members

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Auth**: JWT + bcrypt
- **Deployment**: Railway

## Local Setup

### Prerequisites
- Node.js 18+
- MySQL database

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd team-task-manager
```

### 2. Set up server environment
```bash
cd server
cp .env.example .env
```
Edit `.env`:
```
DATABASE_URL=mysql://root:password@localhost:3306/taskflow
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 3. Install & run server
```bash
cd server && npm install
node index.js
```

### 4. Install & run client
```bash
cd client && npm install
npm run dev
```

Visit `http://localhost:5173`

## Railway Deployment

### Environment Variables to set in Railway:
```
DATABASE_URL = <from Railway MySQL service>
JWT_SECRET   = <any random string>
NODE_ENV     = production
CLIENT_URL   = https://<your-railway-domain>.up.railway.app
```

### Railway auto-detects from `railway.toml`:
- Build: `cd client && npm install && npm run build && cd ../server && npm install`
- Start: `cd server && node index.js`

## Live URL
https://your-railway-url.up.railway.app
