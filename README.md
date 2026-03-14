# VibeSpace – Gen-Z Social Media Platform

## Project Description

VibeSpace is a modern social media platform built using the MERN stack.
The platform focuses on **mood-based interactions, community engagement, and real-time communication** rather than traditional posting systems.

Users can share thoughts, interact with communities, and express their current mood while connecting with others. The platform is designed to be **fast, scalable, and engaging for Gen-Z users**.

This project is being built as a **full-stack learning project and portfolio application** to demonstrate scalable system design, clean architecture, and modern web development practices.

Future improvements will include real-time features, AI-powered recommendations, and advanced social interactions.

---

# Tech Stack

### Frontend

- React
- JavaScript
- TailwindCSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Tools & Services

- Git & GitHub
- REST APIs
- Cloudinary (for media uploads – planned)
- Socket.io (for real-time features – planned)

---

# System Architecture

The application follows a **client–server architecture** using the MERN stack.

```
Frontend (React)
       |
       | HTTP Requests (REST API)
       |
Backend (Node.js + Express)
       |
Business Logic (Controllers / Services)
       |
Database (MongoDB)
```

### High Level Flow

1. User interacts with the React frontend
2. Frontend sends API requests to backend
3. Backend processes logic through controllers and services
4. Data is stored/retrieved from MongoDB
5. Response is returned to frontend and rendered to user

Future architecture will also include:

- Real-time communication using Socket.io
- Media storage using Cloudinary
- Notification services

---

# Installation Guide

### 1. Clone the repository

```
git clone https://github.com/yourusername/vibespace-social-platform.git
cd vibespace-social-platform
```

---

### 2. Install Backend Dependencies

```
cd backend
npm install
```

Create a `.env` file inside the backend directory.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend server:

```
npm run dev
```

---

### 3. Install Frontend Dependencies

Open another terminal:

```
cd frontend
npm install
```

Run frontend:

```
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

Backend will run at:

```
http://localhost:5000
```

---

# API Documentation

### Base URL

```
http://localhost:5000/api
```

### Example Endpoints

#### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

#### User

```
GET /api/users/:id
PUT /api/users/update
```

#### Posts

```
POST /api/posts/create
GET /api/posts/feed
DELETE /api/posts/:id
```

More detailed API documentation will be added as the project grows.

---

# Screenshots

Screenshots will be added once the frontend UI is implemented.

Examples of upcoming pages:

- Landing Page
- User Dashboard
- Post Feed
- Profile Page
- Community Page

---

# Future Features

- Mood-based posts
- Anonymous posting
- Real-time comments and notifications
- Community groups
- AI-powered mood detection
- Recommendation feed algorithm
- Media uploads (images/videos)

---

# Author

Aman Kumar

This project is being developed as a **full-stack portfolio project** to demonstrate strong backend architecture, scalable system design, and modern web development practices.
