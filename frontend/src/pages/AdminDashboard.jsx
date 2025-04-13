import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', description: '', salary: '' });
  const [message, setMessage] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('All');

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = () => {
    axios.get('http://localhost:5000/api/jobs')
      .then(response => setJobs(response.data))
      .catch(err => console.error('Failed to fetch jobs', err));
  };

  const fetchApplications = () => {
    axios.get('http://localhost:5000/api/applications/all')
      .then(response => setApplications(response.data))
      .catch(err => console.error('Failed to fetch applications', err));
  };

  const handleJobInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/jobs/add', newJob);
      setMessage(response.data.message);
      setNewJob({ title: '', description: '', salary: '' });
      fetchJobs();
    } catch (error) {
      console.error('Error adding job:', error);
      setMessage('Failed to add job');
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const uniqueTitles = ['All', ...new Set(applications.map(app => app.job_title))];

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-title">🛠 Admin Dashboard</h1>

      {/* Jobs Listing */}
      <section className="dashboard-section">
        <h2 className="section-title">📄 Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul className="job-list">
            {jobs.map(job => (
              <li key={job.id} className="job-card">
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <p>{job.salary}</p>
                </div>
                <div className="job-actions">
                  <Link to={`/jobs/${job.id}`} className="btn view-btn">View</Link>
                  <button onClick={() => handleDeleteJob(job.id)} className="btn delete-btn">🗑 Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Add Job Form */}
      <section className="dashboard-section">
        <h2 className="section-title">➕ Add New Job</h2>
        {message && <p className="status-message">{message}</p>}
        <form onSubmit={handleJobSubmit} className="job-form">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={newJob.title}
            onChange={handleJobInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={newJob.description}
            onChange={handleJobInputChange}
            required
          ></textarea>
          <input
            type="text"
            name="salary"
            placeholder="Salary (e.g. 6 LPA)"
            value={newJob.salary}
            onChange={handleJobInputChange}
            required
          />
          <button type="submit" className="btn add-btn">Post Job</button>
        </form>
      </section>

      {/* Applications List */}
      <section className="dashboard-section">
        <h2 className="section-title">📥 Applications</h2>

        <div className="filter-container">
          <label htmlFor="job-title-filter">Filter by Title:</label>
          <select
            id="job-title-filter"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
          >
            {uniqueTitles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </select>
        </div>

        <div className="application-list">
          {applications
            .filter(app => selectedTitle === 'All' || app.job_title === selectedTitle)
            .map(app => (
              <div key={app.id} className="application-card">
                <p><strong>Name:</strong> {app.applicant_name}</p>
                <p><strong>Email:</strong> {app.email}</p>
                {app.phone && <p><strong>Phone:</strong> {app.phone}</p>}
                <p><strong>Applied for:</strong> {app.job_title}</p>
                {app.resume_url && (
                  <p>
                    <strong>Resume:</strong>{' '}
                    <a
                      href={`http://localhost:5000/${app.resume_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </p>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* Back Home */}
      <div className="back-home-container">
        <Link to="/" className="btn back-btn">🔙 Back to Home</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
