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
    <div>
      <Menu
        isOpen={menuOpen}
        onStateChange={state => handleStateChange(state)}
        right
        width="50%"
        styles={burgerStyles}
      >
        <div className="remove-outline">
          <div>
            <NavLink to="/" onClick={() => closeMenu()}>
              <span className="navbar-text-color">Hello, guest.</span>
            </NavLink>
          </div>

          <div>
            <NavLink onClick={() => closeMenu()} to="/signin">
              <span className="text-style-bold navbar-text-color">Sign In</span>
            </NavLink>
          </div>

          <div>
            <NavLink onClick={() => closeMenu()} to="/signup">
              <span className="text-style-bold navbar-text-color">Sign Up</span>
            </NavLink>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default SignedOutLinksBurger;
