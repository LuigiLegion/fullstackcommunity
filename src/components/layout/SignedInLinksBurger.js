import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';

import { signOutThunkCreator } from '../../store/reducers/authReducer';

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
          width={'33%'}
          styles={burgerStyles}
        >
          <div styles={divStyles}>
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

const burgerStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '30px',
    top: '17.5px',
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
    backgroundColor: '#424242',
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
