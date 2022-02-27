// Imports
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import { burgerStyles } from '../../styles';

// Component
const SignedOutLinksBurger = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = state => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Menu
      styles={burgerStyles}
      isOpen={menuOpen}
      right
      width="50%"
      onStateChange={state => handleStateChange(state)}
    >
      <div className="outline-none">
        <div className="hello-container">
          <NavLink
            className="navbar-text-color"
            to="/"
            onClick={closeMenu}
          >
            Hello, guest.
          </NavLink>
        </div>

        <div>
          <NavLink
            className="text-style-bold navbar-text-color"
            to="/signin"
            onClick={closeMenu}
          >
            Sign In
          </NavLink>
        </div>

        <div>
          <NavLink
            className="text-style-bold navbar-text-color"
            to="/signup"
            onClick={closeMenu}
          >
            Sign Up
          </NavLink>
        </div>

        <div>
          <a
            className="text-style-bold navbar-text-color"
            href="https://taluigi.netlify.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Contact
          </a>
        </div>
      </div>
    </Menu>
  );
};

// Exports
export default SignedOutLinksBurger;
