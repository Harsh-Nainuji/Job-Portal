import express from 'express';
import { applyToJob, getAllApplications } from '../controllers/applicationController.js';
import upload from '../middleware/upload.js'; // Import the multer middleware

const router = express.Router();

// Use upload.single('resume') to handle single PDF file under the field name "resume"
router.post('/apply', upload.single('resume'), applyToJob);
router.get('/all', getAllApplications);

export default router;
