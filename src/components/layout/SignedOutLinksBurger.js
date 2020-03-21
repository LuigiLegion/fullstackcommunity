// Imports
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import { burgerStyles } from '../../styles';

// Component
class SignedOutLinksBurger extends PureComponent {
  state = {
    menuOpen: false,
  };

  handleStateChange = state => {
    this.setState({
      menuOpen: state.isOpen,
    });
  };

  closeMenu = () => {
    this.setState({
      menuOpen: false,
    });
  };

  render() {
    return (
      <div>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          right
          width="50%"
          styles={burgerStyles}
        >
          <div className="remove-outline">
            <div>
              <NavLink
                onClick={() => {
                  this.closeMenu();
                }}
                to="/signin"
              >
                <strong>Sign In</strong>
              </NavLink>
            </div>

            <div>
              <NavLink
                onClick={() => {
                  this.closeMenu();
                }}
                to="/signup"
              >
                <strong>Sign Up</strong>
              </NavLink>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}

export default SignedOutLinksBurger;
