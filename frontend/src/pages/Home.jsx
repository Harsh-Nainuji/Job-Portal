import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import JobCard from '../components/JobCard';
import axios from 'axios';
import '../styles/main.css';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div>
      <Hero />

      {/* About NovaNectar */}
      <section className="intro-section">
        <div className="container">
          <h2>Who We Are</h2>
          <p>
            At <strong>NovaNectar Services Private Limited</strong>, we are more than just a tech company — 
            we are your digital partners. From web development and app creation to SEO, design, and marketing,
            our mission is clear: <em>Your Problems, Our Solutions</em>.
          </p>
          <p>
            With a passionate team by your side, we make sure your ideas reach the world the way they’re meant to.
            Whether you're an employer looking to hire or a job seeker aiming for the perfect opportunity — we’ve got you.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <h2>Why Choose NovaNectar?</h2>
          <ul className="features-list">
            <li>✅ Expert team dedicated to quality and innovation</li>
            <li>✅ End-to-end digital solutions tailored to your needs</li>
            <li>✅ 24/7 support and personalized client attention</li>
            <li>✅ Deep understanding of the modern digital job landscape</li>
          </ul>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="jobs-section" id="jobsSection">
        <div className="container">
          <h2>Available Jobs</h2>
          <div className="jobs-grid">
            {jobs.length > 0 ? (
              jobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <p>No jobs available at the moment. Please check back soon.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
