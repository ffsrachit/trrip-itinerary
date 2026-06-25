# ✈️ Trrip - AI Travel Itinerary Generator

A MERN stack web application that automatically generates AI-powered travel itineraries from uploaded booking documents.

## 🚀 Live Demo
- **Frontend:** https://trrip-frontend.onrender.com
- **Backend:** https://trrip-backend-1-4jca.onrender.com

## ✨ Features
- 🔐 JWT-based Authentication (Login/Register)
- 📄 Upload travel documents (PDF/Images)
- 🤖 AI-powered itinerary generation using Groq (LLaMA 3.1)
- 📅 Day-by-day detailed travel itinerary
- 🗂️ View previously generated itineraries
- 🔗 Share itineraries via unique public link
- 🖱️ Drag & Drop file uploads
- ☁️ Cloudinary for document storage
- 📱 Fully responsive UI

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Dropzone

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Groq AI API (LLaMA 3.1)
- Cloudinary
- Multer
- pdfreader

## 📁 Folder Structure
trrip-itinerary/

├── client/                 # React Frontend

│   ├── src/

│   │   ├── components/     # UploadSection, ItineraryCard

│   │   ├── pages/          # Landing, Login, Register, Dashboard, SharedItinerary

│   │   ├── context/        # AuthContext

│   │   └── utils/          # API config

└── server/                 # Node.js Backend

├── config/             # Cloudinary config

├── controllers/        # Auth, Itinerary controllers

├── middleware/          # JWT auth middleware

├── models/             # User, Itinerary models

├── routes/             # Auth, Itinerary routes

└── utils/              # AI extraction utility
## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq API key (console.groq.com)
- Cloudinary account

### Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

## 🔗 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/itinerary/upload` | Upload doc & generate itinerary | Yes |
| GET | `/api/itinerary/my` | Get my itineraries | No |
| GET | `/api/itinerary/share/:token` | Get shared itinerary | No |
| DELETE | `/api/itinerary/:id` | Delete itinerary | Yes |

## 🌐 Deployment
- **Frontend:** Render (Static Site)
- **Backend:** Render (Web Service)
- **Database:** MongoDB Atlas
- **Storage:** Cloudinary

## 👨‍💻 Author
Rachit Sharma  
B.Tech CSE | MERN Stack Developer  
GitHub: https://github.com/ffsrachit

## 📝 License
MIT