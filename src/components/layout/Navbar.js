import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// import SignedInLinks from './SignedInLinks';
import SignedInLinksBurger from './SignedInLinksBurger';
import SignedOutLinks from './SignedOutLinks';

const Navbar = props => {
  const { auth, profile } = props;
  const curLinks = auth.uid ? (
    // <SignedInLinks profile={profile} />
    <SignedInLinksBurger profile={profile} />
  ) : (
    <SignedOutLinks />
  );
  return (
    <div className="navbar-fixed grey darken-3">
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <NavLink to="/" className="left brand-logo">
            <strong>Fullstack Community</strong>
          </NavLink>
          {curLinks}
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = state => {
  // console.log('state: ', state);
  return { auth: state.firebase.auth, profile: state.firebase.profile };
};

export default connect(mapStateToProps)(Navbar);
