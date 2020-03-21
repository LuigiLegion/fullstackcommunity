// Imports
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignedInLinks from './SignedInLinks';
import SignedInLinksBurger from './SignedInLinksBurger';
import SignedOutLinks from './SignedOutLinks';
import SignedOutLinksBurger from './SignedOutLinksBurger';

// Component
class Navbar extends PureComponent {
  state = {
    width: 0,
  };

  componentDidMount() {
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
    });
  };

  render() {
    const { auth, profile } = this.props;
    const largeViewCheck = this.state.width > 1007;

    let curLinks;

    if (auth.uid) {
      if (largeViewCheck) {
        curLinks = <SignedInLinks profile={profile} />;
      } else {
        curLinks = <SignedInLinksBurger profile={profile} />;
      }
    } else if (largeViewCheck) {
      curLinks = <SignedOutLinks />;
    } else {
      curLinks = <SignedOutLinksBurger />;
    }

    return (
      <div className="navbar-fixed">
        <nav className="nav-wrapper grey darken-4">
          <div>
            <NavLink to="/" className="left brand-logo name-text-positioning">
              {largeViewCheck ? 'Fullstack Community' : 'FSCommunity'}
            </NavLink>

            {curLinks}
          </div>
        </nav>
      </div>
    );
  }
}

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default connect(mapStateToProps)(Navbar);

// Prop Types
Navbar.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
};
