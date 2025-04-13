import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic credential check (replace with secure API call in production)
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 className="admin-title">Admin Panel</h2>
        <p className="admin-subtitle">Login to manage job listings and applications</p>

        {error && <p className="error-message">{error}</p>}

        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-label">
            Username
            <input
              type="text"
              className="admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              required
            />
          </label>

          <label className="admin-label">
            Password
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </label>

          <button type="submit" className="admin-login-btn">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
