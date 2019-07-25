import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedInLinksBurger from './SignedInLinksBurger';
import SignedOutLinks from './SignedOutLinks';
import SignedOutLinksBurger from './SignedOutLinksBurger';

class Navbar extends Component {
  constructor() {
    super();
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { auth, profile } = this.props;
    let curLinks;
    if (auth.uid) {
      if (document.body.offsetWidth > 1007) {
        curLinks = <SignedInLinks profile={profile} />;
      } else {
        curLinks = <SignedInLinksBurger profile={profile} />;
      }
    }

    // else {
    //   curLinks = <SignedOutLinks />;
    // }
    else {
      if (document.body.offsetWidth > 1007) {
        curLinks = <SignedOutLinks />;
      } else {
        curLinks = <SignedOutLinksBurger />;
      }
    }

    // const curLinks = auth.uid ? (
    //   // <SignedInLinks profile={profile} />
    //   <SignedInLinksBurger profile={profile} />
    // ) : (
    //   <SignedOutLinks />
    // );

    return (
      <div className="navbar-fixed">
        <nav className="nav-wrapper grey darken-3">
          <div>
            <NavLink to="/" className="left brand-logo name-text-positioning">
              <strong>Fullstack Community</strong>
            </NavLink>
            {curLinks}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state: ', state);
  return { auth: state.firebase.auth, profile: state.firebase.profile };
};

export default connect(mapStateToProps)(Navbar);
