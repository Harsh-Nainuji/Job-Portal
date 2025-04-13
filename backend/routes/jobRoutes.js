import express from 'express';
import {
  getAllJobs,
  getJobById,   // newly added route
  addJob,
  deleteJob
} from '../controllers/jobController.js';

const router = express.Router();

// Routes
router.get('/', getAllJobs);           // Get all jobs
router.get('/:id', getJobById);        // Get a single job by ID
router.post('/add', addJob);           // Add a new job
router.delete('/:id', deleteJob);      // Delete a job by ID

export default router;
