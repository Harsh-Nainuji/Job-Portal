import pool from '../config/db.js';

// User applies for a job with file upload handling (Multer)
export const applyToJob = async (req, res) => {
  const { job_id, applicant_name, email } = req.body;
  
  // Multer adds the file info to req.file
  const resumePath = req.file ? req.file.path : null;
  
  if (!resumePath) {
    return res.status(400).json({ message: 'Resume file is required.' });
  }
  
  try {
    // Insert the application data into the database.
    // Ensure your applications table has a column `resume_url` to store the file path.
    await pool.query(
      'INSERT INTO applications (job_id, applicant_name, email, resume_url) VALUES (?, ?, ?, ?)',
      [job_id, applicant_name, email, resumePath]
    );
    res.json({ message: 'Application submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting application', error: err.message });
  }
};

// Admin can fetch all applications
export const getAllApplications = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, j.title AS job_title 
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      ORDER BY a.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
