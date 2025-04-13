import pool from '../config/db.js';

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a job
export const addJob = async (req, res) => {
  const { title, description, salary } = req.body;
  try {
    await pool.query(
      'INSERT INTO jobs (title, description, salary) VALUES (?, ?, ?)',
      [title, description, salary]
    );
    res.json({ message: 'Job added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM jobs WHERE id = ?', [id]);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching job', error: err.message });
  }
};
