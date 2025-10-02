// In backend/src/index.js

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import aiRoutes from './routes/aiRoutes.js'; // Add this with your other route imports


import connectDB from './config/database.js'; // Make sure this file exists
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import entryRoutes from './routes/entryRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/ai', aiRoutes); // Add this with your other app.use() calls for routes

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/entries', entryRoutes);

// Connect to Database and Start Server
connectDB()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}!`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed! " + error);
  });