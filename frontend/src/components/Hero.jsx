import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';


const Hero = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    
    const jobsSection = document.getElementById('jobsSection');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      
      navigate('/');
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to NovaNeactars Job Portal</h1>
        <p>Your dream job is just a click away.</p>
        
        
          <a href="#jobsSection"><button className="cta-btn" onClick={handleExplore}> Explore Jobs
          </button></a>
         
      </div>
      <div className="floating-shape shape1"></div>
      <div className="floating-shape shape2"></div>
      <div className="floating-shape shape3"></div>
      <div className="floating-shape shape4"></div>
      <div className="floating-shape shape5"></div>
      <div className="floating-shape shape6"></div>
      <div className="floating-shape shape7"></div>
      <div className="floating-shape shape8"></div>
    </section>
  );
};

export default Hero;
