import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const NavBar = () => (
  <nav className="navbar">
    <div className="logo">
     <h2 id="Logo">NovaNeactars</h2>
    </div>
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      
    </ul>
  </nav>
);

export default NavBar;
