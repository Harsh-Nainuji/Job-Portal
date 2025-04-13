import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/main.css'; // Ensure you import your global styles

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  // Form states
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [applicationMessage, setApplicationMessage] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Error fetching job details.');
      }
    };
    fetchJob();
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setApplicationMessage('Please upload your resume.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('job_id', id);
      formData.append('applicant_name', applicantName);
      formData.append('email', email);
      formData.append('resume', resume);

      const response = await axios.post(
        'http://localhost:5000/api/applications/apply',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setApplicationMessage(response.data.message || 'Application submitted!');
      setApplicantName('');
      setEmail('');
      setResume(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      setApplicationMessage('Failed to submit application.');
    }
  };

  if (error) return <div className="job-error">{error}</div>;
  if (!job) return <div className="job-loading">Loading job details...</div>;

  return (
    <div className="job-details-container">
      <div className="job-header">
        <h1>{job.title}</h1>
        <p className="job-salary">💰 Salary: <strong>{job.salary}</strong></p>
      </div>

      <div className="job-description">
        <h3>Description</h3>
        <p>{job.description}</p>
      </div>

      <div className="job-apply-form">
        <h2>Apply for this job</h2>
        {applicationMessage && (
          <p className={`application-msg ${applicationMessage.includes('success') ? 'success' : 'error'}`}>
            {applicationMessage}
          </p>
        )}
        <form onSubmit={handleApplicationSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              required
              placeholder="Your Full Name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label>Resume (PDF only)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="cta-btn">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default JobDetails;
