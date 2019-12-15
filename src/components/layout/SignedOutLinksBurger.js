import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import { burgerStyles } from '../../styles';

class SignedOutLinksBurger extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    };
    this.handleStateChange = this.handleStateChange.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    // this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // toggleMenu() {
  //   this.setState(state => ({ menuOpen: !state.menuOpen }));
  // }

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
                to="/signup"
              >
                <strong>Sign Up</strong>
              </NavLink>
            </div>
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
          </div>
        </Menu>
      </div>
    );
  }
}

export default SignedOutLinksBurger;
