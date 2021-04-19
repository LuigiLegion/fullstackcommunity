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
        <div>
          <NavLink to="/" onClick={closeMenu}>
            <span className="navbar-text-color">Hello, guest.</span>
          </NavLink>
        </div>

        <div>
          <a
            href="https://taluigi.netlify.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <span className="text-style-bold navbar-text-color">Contact</span>
          </a>
        </div>

        <div>
          <NavLink to="/signin" onClick={closeMenu}>
            <span className="text-style-bold navbar-text-color">Sign In</span>
          </NavLink>
        </div>

        <div>
          <NavLink to="/signup" onClick={closeMenu}>
            <span className="text-style-bold navbar-text-color">Sign Up</span>
          </NavLink>
        </div>
      </div>
    </Menu>
  );
};

// Exports
export default SignedOutLinksBurger;
