import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const JobCard = ({ job }) => {
  return (
    <div className="job-card-preview">
      <div className="job-header">
        
        <div className="job-info">
          <h3>{job.title}</h3>
          <p className="company-name">{job.company}</p>
          <p className="salary">{job.salary}</p>
        </div>
      </div>

      <p className="job-snippet">
        {job.description.length > 100
          ? job.description.substring(0, 100) + '...'
          : job.description}
      </p>

      <Link to={`/jobs/${job.id}`}>
        <button className="view-details-btn">🔍 View Details</button>
      </Link>
    </div>
  );
};

export default JobCard;
