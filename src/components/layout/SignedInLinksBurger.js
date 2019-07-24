import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';

import { signOutThunkCreator } from '../../store/reducers/authReducer';

class SignedInLinks extends Component {
  constructor() {
    super();
    this.showSettings = this.showSettings.bind(this);
  }

  showSettings(event) {
    event.preventDefault();
    // fill in
  }

  render() {
    return (
      <div className="right">
        <NavLink to="/" className="btn btn-floating red lighten-1">
          {this.props.profile.initials}
        </NavLink>
        <Menu right width={'20%'} styles={burgerStyles}>
          <div styles={divStyles}>
            <div>
              <NavLink to="/map">Map</NavLink>
            </div>
            <div>
              <NavLink to="/create">New Project</NavLink>
            </div>
            <div>
              <NavLink to="/" onClick={this.props.signOutThunk}>
                Sign Out
              </NavLink>
            </div>

            <a
              onClick={this.showSettings}
              className="menu-item--small"
              href="#!"
            >
              Settings
            </a>
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
)(SignedInLinks);

const burgerStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '30px',
    top: '20px',
  },
  bmBurgerBars: {
    background: '#ef5350',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#373a47',
    // padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    backgroundColor: '#ef5350',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

const divStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
