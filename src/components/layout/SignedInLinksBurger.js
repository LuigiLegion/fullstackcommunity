// Imports
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store/reducers/authReducer';
import { burgerStyles } from '../../styles';

// Component
class SignedInLinksBurger extends PureComponent {
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
                onClick={() => this.closeMenu()}
                to="/"
                className="btn btn-floating grey darken-3"
              >
                <strong>{this.props.profile.initials}</strong>
              </NavLink>
            </div>

            <div>
              <NavLink onClick={() => this.closeMenu()} to="/map">
                <strong>Map</strong>
              </NavLink>
            </div>

            <div>
              <NavLink onClick={() => this.closeMenu()} to="/meetups">
                <strong>Meetup Manager</strong>
              </NavLink>
            </div>

            <div>
              <NavLink onClick={() => this.closeMenu()} to="/create">
                <strong>New Project</strong>
              </NavLink>
            </div>

            <div>
              <a
                onClick={() => this.closeMenu()}
                href="https://gitness-tracker.web.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Gitness Tracker</strong>
              </a>
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

// Container
const mapDispatchToProps = dispatch => ({
  signOutThunk() {
    dispatch(signOutThunkCreator());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinksBurger);

// Prop Types
SignedInLinksBurger.propTypes = {
  profile: PropTypes.object,
  signOutThunk: PropTypes.func,
};
