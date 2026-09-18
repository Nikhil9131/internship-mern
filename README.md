# 🏖️ Sol & Sands — Hospitality Advisory & Project Intelligence Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-7.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Vercel-Frontend%20Live-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Render-Backend%20Live-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>

<p align="center">
  <b>An end-to-end full-stack MERN platform empowering hotel developers, investors, and consultants with feasibility audits, government subsidy tracking, brand franchise intelligence, and vendor procurement planning.</b>
</p>

---

## 🌟 Live Demo & Deployment

| Resource | Platform | URL |
| :--- | :--- | :--- |
| **Frontend Application** | **Vercel** | [https://sol-and-sands.vercel.app](https://sol-and-sands.vercel.app) |
| **Backend REST API** | **Render** | [https://internship-mern.onrender.com](https://internship-mern.onrender.com) |
| **API Health & Test Route** | **Render** | [https://internship-mern.onrender.com/api](https://internship-mern.onrender.com/api) |
| **GitHub Repository** | **GitHub** | [https://github.com/Nikhil9131/internship-mern](https://github.com/Nikhil9131/internship-mern) |

---

## 📑 Table of Contents

- [Key Highlights & Features](#-key-highlights--features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started Locally](#-getting-started-locally)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [API Endpoints Overview](#-api-endpoints-overview)
- [Deployment Guide (Vercel & Render)](#-deployment-guide-vercel--render)
  - [Frontend Deployment (Vercel)](#1-frontend-deployment-vercel)
  - [Backend Deployment (Render)](#2-backend-deployment-render)
- [License](#-license)

---

## 🚀 Key Highlights & Features

### 📊 1. Project Viability & Capex Modeling
- Financial feasibility blueprints across multiple hotel archetypes:
  - **City / Business Hotel** (High vertical FAR spatial efficiency)
  - **Wildlife & Nature Resort** (Eco-adventure & wellness zoning)
  - **Heritage Palace Restoration** (Experiential luxury & adaptive reuse)
  - **Boutique Wellness Retreat & Highway Waypoints**
- Pre-calculated metrics for **Expected Capex, ADR (Average Daily Rate), Occupancy Forecasts, EBITDA margins, and Payback Schedules**.

### 🏛️ 2. Government Subsidy & Policy Guidance
- Direct compliance pathways for **Capital Investment Subsidies (up to 30%)**, **Stamp Duty Concessions**, and **Electricity Tariff Rebates**.
- Milestone trackers for statutory approvals: Town Planning (TNCP), Fire Department NOC, State Pollution Control Board (CTO/CTE), and Tourism Board Sanctions.

### 🏷️ 3. Brand Affiliation & Franchise Insights
- Strategic insights comparing **Franchise**, **Management Agreement**, and **Revenue Share** models for major hospitality chains (Marriott, IHG, Radisson, Lemon Tree, etc.).
- Critical advisories on Property Improvement Plan (PIP) caps and territorial exclusivity clauses.

### 🛠️ 4. Vendor Procurement Planning Matrix
- Categorized budgeting and procurement guidelines for **Architecture, Civil Infrastructure, MEP/HVAC Systems, Commercial Kitchens & Bars, and FF&E/OS&E Furnishing**.

### 🔐 5. Role-Based Security & Management Console
- **User Dashboard:** Tailored advisory context, personal account management, and inquiry status tracking.
- **Admin Management Console:** Complete moderation portal to manage registered accounts, elevate user permissions, and handle client inquiries.

---

## 🏗️ System Architecture

```mermaid
graph TD
    User["End User / Browser"]
    subgraph Vercel_Cloud["Vercel Edge Network (Frontend)"]
        VercelSPA["React 19 + Vite SPA<br/>sol-and-sands.vercel.app"]
        VercelRewrite["vercel.json SPA Rewrites"]
    end
    subgraph Render_Cloud["Render Cloud Platform (Backend)"]
        API["Express.js REST API (Node.js 24)<br/>internship-mern.onrender.com"]
        Auth["JWT Authentication & Security Middleware"]
        RateLimit["Express Rate Limiter & Helmet"]
    end
    subgraph DB_Cloud["MongoDB Atlas"]
        DB[("Cloud Database Cluster")]
    end

    User -->|HTTPS Request| VercelSPA
    VercelSPA --> VercelRewrite
    VercelSPA -->|REST API Calls (Bearer JWT)| API
    API --> RateLimit
    RateLimit --> Auth
    Auth --> API
    API -->|Mongoose ODM| DB
```

---

## 💻 Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router v7, Lucide Icons, Custom Ocean-Beach HSL Design System |
| **Frontend Hosting** | **Vercel** (Global Edge CDN, Automatic Git CI/CD, SPA rewrites via `vercel.json`) |
| **Backend** | Node.js (v24), Express.js, Joi Validation, Helmet Security, Rate Limiter |
| **Backend Hosting** | **Render** (Cloud Web Service, Auto-deploy from GitHub `main` branch) |
| **Database** | MongoDB Atlas, Mongoose ODM, Embedded MongoDB engine fallback |
| **Authentication** | JWT (JSON Web Tokens), BCrypt password hashing |

---

## 📁 Project Structure

```text
Internship-MERN/
├── backend/
│   ├── config/             # Database connection (Atlas/Local) & Env validation
│   ├── controllers/        # User, Product, and Inquiry business logic
│   ├── middleware/         # Auth (JWT), Rate limiters, Error handling, Joi validation
│   ├── models/             # Mongoose Schemas (User, Product, Inquiry)
│   ├── routes/             # RESTful API route definitions
│   ├── validators/         # Joi input validation schemas
│   ├── server.js           # Express application entrypoint
│   └── package.json        # Backend dependencies & scripts
├── frontend/
│   ├── public/             # Static assets and favicon
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, ProtectedRoutes, etc.)
│   │   ├── context/        # React AuthContext state management
│   │   ├── pages/          # Dashboard, Login, Register, Viability, Brand, Subsidy, etc.
│   │   ├── utils/          # Axios API instance with auto-environment detection & JWT
│   │   ├── App.jsx         # Client-side routing configuration
│   │   └── main.jsx        # Root application renderer
│   ├── .env.development    # Local development API endpoint (http://localhost:5001/api)
│   ├── .env.production     # Production API endpoint (https://internship-mern.onrender.com/api)
│   ├── vercel.json         # Vercel SPA rewrites & build configuration
│   ├── vite.config.js      # Vite build configuration
│   └── package.json        # Frontend dependencies & scripts
├── package.json            # Root workspace scripts
├── .gitignore              # Ignored files (node_modules, .env, builds)
└── README.md               # Project documentation
```

---

## 🛠️ Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
cp -nikhil.env .env  # Or create .env manually with the following values:
```

**`backend/.env` contents:**
```env
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://localhost:27017/internship_db
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
JWT_EXPIRES_IN=7d
```

```bash
# Start the backend server
npm run dev
# Server will run at: http://localhost:5001
```

---

### 2. Frontend Setup

```bash
# In a separate terminal, navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
# App will run at: http://127.0.0.1:5173
```

---

## 📡 API Endpoints Overview

### 👤 User & Authentication
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/register` | Public | Register a new account |
| `POST` | `/api/users/login` | Public | Authenticate user & receive JWT token |
| `GET` | `/api/users/profile` | Private | Fetch logged-in user details |
| `GET` | `/api/users` | Admin | List all registered users |
| `PUT` | `/api/users/:id` | Admin | Update user details and roles |
| `DELETE` | `/api/users/:id` | Admin | Remove user account |

### 🏨 Products & Inquiries
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | Fetch available advisory packages |
| `POST` | `/api/inquiries` | Public/User | Submit project consultation inquiry |
| `GET` | `/api/inquiries` | Admin | Moderate incoming client inquiries |

---

## ☁️ Deployment Guide (Vercel & Render)

This project adopts a decoupled cloud architecture: the **React 19 Vite frontend** is hosted on **Vercel** for edge performance, while the **Express REST API** is hosted on **Render** connecting to **MongoDB Atlas**.

---

### 1. Frontend Deployment (Vercel)

The frontend is deployed live at **[https://sol-and-sands.vercel.app](https://sol-and-sands.vercel.app)**.

#### Deployment Steps:
1. **Import Project**: Log in to [Vercel](https://vercel.com) and import the repository (`https://github.com/Nikhil9131/internship-mern.git`).
2. **Configure Project Settings**:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click "Edit" and choose `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
3. **Configure Environment Variables**:
   In the Vercel dashboard under **Settings → Environment Variables**, add:
   ```env
   VITE_API_URL=https://internship-mern.onrender.com/api
   ```
4. **SPA Client-Side Routing Configuration (`vercel.json`)**:
   To ensure client-side routes (e.g. `/project-viability`, `/login`, `/admin`) resolve correctly upon browser refresh without 404 errors, [frontend/vercel.json](file:///c:/Users/nikhi/OneDrive/Desktop/Internship-MERN/frontend/vercel.json) is configured:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

---

### 2. Backend Deployment (Render)

The backend API is deployed live at **[https://internship-mern.onrender.com](https://internship-mern.onrender.com)**.

#### Deployment Steps:
1. **Create Web Service**: Log in to [Render Dashboard](https://dashboard.render.com/) and click **New + → Web Service**.
2. **Connect Repository**: Select `Nikhil9131/internship-mern`.
3. **Configure Service Settings**:
   - **Name:** `internship-mern`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. **Configure Environment Variables**:
   In the Render dashboard under the **Environment** tab, set:
   | Key | Example / Recommended Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production mode & error handling |
   | `PORT` | `5001` | Express port (Render automatically routes `$PORT`) |
   | `MONGO_URI` | `mongodb+srv://<user>:<pass>@cluster.mongodb.net/internship_db?retryWrites=true&w=majority` | Cloud MongoDB Atlas URI |
   | `JWT_SECRET` | `a_very_long_and_secure_secret_key_minimum_32_characters` | Signing secret for authentication tokens |
   | `JWT_EXPIRES_IN` | `7d` | Lifetime of issued JWT tokens |
5. **CORS & Proxy Settings**:
   The backend includes `app.set("trust proxy", 1)` for Render reverse-proxy rate limiting and dynamic CORS headers enabling queries from `https://sol-and-sands.vercel.app`.

---

## 📄 License

This project is licensed under the **ISC License**.