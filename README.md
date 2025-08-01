FUTURE_FS_02: Mini E-commerce Store
This is a full-stack e-commerce application built with a modern technology stack. The project is divided into two main parts: a Next.js frontend for the user interface and a Node.js/Express backend for the API and database management.

Features
Product Listing: Browse all available products.

Product Details: View detailed information for a single product.

Shopping Cart: Add, view, and manage items in a shopping cart.

Backend API: RESTful API for handling product and cart data.

Database: MongoDB for persistent data storage.

Technology Stack
Frontend
Framework: Next.js

Language: TypeScript

Styling: Tailwind CSS

Backend
Runtime: Node.js

Framework: Express

Database: MongoDB

ORM/ODM: Mongoose

Getting Started
Follow these steps to get a local copy of the project up and running for development purposes.

Prerequisites
Node.js: Install Node.js (version 16 or higher is recommended).

MongoDB: You can use a local MongoDB instance or a cloud service like MongoDB Atlas.

1. Clone the Repository
If you haven't already, clone this repository from GitHub:

git clone https://github.com/Satyen123/FUTURE_FS_02.git
cd FUTURE_FS_02

2. Backend Setup
Navigate to the backend directory and install the dependencies.

cd backend
npm install

Create a .env file in the backend directory with your MongoDB connection string and a port number.

# backend/.env
MONGO_URI=mongodb://localhost:27017/ecommerce_db
PORT=5000

Start the backend server:

npm run dev

The backend API will be running at http://localhost:5000.

3. Frontend Setup
In a new terminal window, navigate to the frontend directory and install the dependencies.

cd frontend
npm install

Create a .env.local file in the frontend directory to set the backend API URL.

# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Start the Next.js development server:

npm run dev

The frontend application will be running at http://localhost:3000.

Deployment
This is a full-stack application, so the frontend and backend must be deployed separately to services that support their respective technologies.

Backend Deployment
Recommended Platforms: Heroku or Render.

Required Configuration:

Set the MONGO_URI environment variable with your production MongoDB Atlas connection string.

Ensure the PORT is configured to use the value provided by the hosting platform (your server.js already handles this).

Frontend Deployment
Recommended Platforms: Vercel or Netlify.

Required Configuration:

Set the NEXT_PUBLIC_API_URL environment variable to the live URL of your deployed backend API (e.g., https://your-backend-app.onrender.com/api).
