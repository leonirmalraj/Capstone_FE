import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from React Router
import '../assets/css/Header.css'; // Import CSS for styling

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-links">
          <li><NavLink to="/" >logo</NavLink></li>
          <li><NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink></li>
        </ul>
        <ul className="navbar-links">
          <li><NavLink to="/signin" activeclassname="active">Sign In</NavLink></li>
          <li><NavLink to="/signup" activeclassname="active">Sign Up</NavLink></li>
          <li><NavLink to="/profile" activeclassname="active">User Profile</NavLink></li>
          <li><NavLink to="/addcolors" activeclassname="active">Add Colors</NavLink></li>
          <li><NavLink to="/about" activeclassname="active">About</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
