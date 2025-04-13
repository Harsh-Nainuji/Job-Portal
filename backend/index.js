import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import pool from './config/db.js'; // DB connection

// Load environment variables
dotenv.config();

// Setup directory variables (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/applications', applicationRoutes);
app.use('/api/jobs', jobRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Job Portal API Running ✅');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
