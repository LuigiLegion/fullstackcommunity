// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li className="navbar-link">
        <NavLink
          className="navbar-text-color"
          to="/"
        >
          Hello, guest.
        </NavLink>
      </li>

      <li className="navbar-link">
        <NavLink
          className="text-style-bold navbar-text-color"
          to="/signin"
        >
          Sign In
        </NavLink>
      </li>

      <li className="navbar-link">
        <NavLink
          className="text-style-bold navbar-text-color"
          to="/signup"
        >
          Sign Up
        </NavLink>
      </li>

      <li className="navbar-link">
        <a
          className="text-style-bold navbar-text-color padding-right"
          href="https://taluigi.netlify.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </li>
    </ul>
  );
};

// Exports
export default SignedOutLinks;
