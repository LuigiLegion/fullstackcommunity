// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li className="navbar-link">
        <NavLink to="/">
          <span className="navbar-text-color">Hello, guest.</span>
        </NavLink>
      </li>

      <li className="navbar-link">
        <NavLink to="/signin">
          <span className="text-style-bold navbar-text-color">Sign In</span>
        </NavLink>
      </li>

      <li className="navbar-link">
        <NavLink to="/signup">
          <span className="text-style-bold navbar-text-color">Sign Up</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
