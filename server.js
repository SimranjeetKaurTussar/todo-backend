//server.js

import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors"; // Import cors
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Database connection
const MONGO_URI = 'mongodb://localhost:27017/myDatabase'; 

mongoose.connect('mongodb://localhost:27017/yourdbname')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
