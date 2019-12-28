import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';

import { signOutThunkCreator } from '../../store/reducers/authReducer';
import { burgerStyles } from '../../styles';

class SignedInLinksBurger extends Component {
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
                onClick={() => this.closeMenu()}
                to="/"
                className="btn btn-floating grey darken-3"
              >
                <strong>{this.props.profile.initials}</strong>
              </NavLink>
            </div>
            <div>
              <NavLink onClick={() => this.closeMenu()} to="/leaderboard">
                <strong>Gitness Tracker</strong>
              </NavLink>
            </div>
            <div>
              <NavLink onClick={() => this.closeMenu()} to="/meetups">
                <strong>Meetup Manager</strong>
              </NavLink>
            </div>
            <div>
              <NavLink onClick={() => this.closeMenu()} to="/map">
                <strong>Map</strong>
              </NavLink>
            </div>
            <div>
              <NavLink onClick={() => this.closeMenu()} to="/create">
                <strong>New Project</strong>
              </NavLink>
            </div>
            <div>
              <NavLink
                onClick={() => {
                  this.closeMenu();
                  this.props.signOutThunk();
                }}
                to="/"
              >
                <strong>Sign Out</strong>
              </NavLink>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signOutThunk() {
    dispatch(signOutThunkCreator());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinksBurger);
