/* eslint-disable react/button-has-type */

// Imports
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signUpThunkCreator } from '../../store/reducers/authReducer';
import fullstackCommunityAccessToken from '../../config/fscConfig';
import { stations } from '../../data/nyc-subway-stations.json';

// Initializations
const defaultLocation = stations[0];

// Component
const SignUp = ({ auth, signUpError, signUpThunk }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    githubUsername: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    status: 'Junior',
    company: '',
    cohort: '1911',
    program: 'FSA-NY',
    location: defaultLocation,
    accessToken: '',
    accessTokenError: false,
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelect = event => {
    const location = stations.filter(
      curSubwayStation => curSubwayStation.name === event.target.value
    )[0];

    setState({
      ...state,
      location,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (state.accessToken === fullstackCommunityAccessToken) {
      setState({
        ...state,
        accessTokenError: false,
      });

      signUpThunk(state);
    } else {
      setState({
        ...state,
        accessTokenError: true,
      });
    }
  };

  if (auth.uid) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container">
        <form onSubmit={handleSubmit} className="card white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>

          <div className="input-field">
            <label htmlFor="email">
              Email<span className="text-color-red">*</span> (Example:
              cody@email.com)
            </label>

            <input
              type="email"
              id="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Example: cody@email.com"
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">
              Password<span className="text-color-red">*</span> (May only
              contain one uppercase letter, one lowercase letter, one digit, and
              at least 8 characters in total)
            </label>

            <input
              type="password"
              id="password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}"
              title="May only contain one uppercase letter, one lowercase letter, one digit, and at least 8 characters in total"
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="githubUsername">
              GitHub Username<span className="text-color-red">*</span> (May only
              contain alphanumeric characters or hyphens, and a maximum of 39
              characters in total)
            </label>

            <input
              type="text"
              id="githubUsername"
              required
              pattern="[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$"
              title="May only contain alphanumeric characters or
                hyphens, and a maximum of 39 characters in total"
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="firstName">
              First Name<span className="text-color-red">*</span> (May only
              contain uppercase and lowercase letters only, and at least 2
              characters in total)
            </label>

            <input
              type="text"
              id="firstName"
              required
              pattern="[A-Za-z]{2,32}"
              title="May only contain uppercase and lowercase letters only, and at least 2 characters in total"
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="lastName">
              Last Name<span className="text-color-red">*</span> (May only
              contain uppercase and lowercase letters only, and at least 2
              characters in total)
            </label>

            <input
              type="text"
              id="lastName"
              required
              pattern="[A-Za-z]{2,32}"
              title="May only contain uppercase and lowercase letters only, and at least 2 characters in total"
              onChange={handleChange}
            />
          </div>

          <div className="input-field col s12">
            <label htmlFor="gender">
              Gender<span className="text-color-red">*</span>
            </label>

            <br />
            <br />

            <select
              id="gender"
              className="browser-default"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                --Please choose an option--
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-field col s12">
            <label htmlFor="status">
              Status<span className="text-color-red">*</span>
            </label>

            <br />
            <br />

            <select
              id="status"
              className="browser-default"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                --Please choose an option--
              </option>
              <option value="Junior">Student - Junior Phase</option>
              <option value="Senior">Student - Senior Phase</option>
              <option value="Unemployed">Alum - Seeking Opportunities</option>
              <option value="Employed">Alum - Employed</option>
            </select>
          </div>

          {state.status === 'Employed' ? (
            <div className="input-field">
              <label htmlFor="company">
                Company Name<span className="text-color-red">*</span> (May only
                contain uppercase and lowercase letters only, and at least 2
                characters in total)
              </label>

              <input
                type="text"
                id="company"
                required
                pattern="[A-Za-z]+{2,32}"
                title="May only contain uppercase and lowercase letters only, and at least 2 characters in total"
                onChange={handleChange}
              />
            </div>
          ) : null}

          <div className="input-field col s12">
            <label htmlFor="cohort">
              Cohort<span className="text-color-red">*</span>
            </label>

            <br />
            <br />

            <select
              id="cohort"
              className="browser-default"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                --Please choose an option--
              </option>
              <option value="2001">2001</option>
              <option value="1911">1911</option>
              <option value="1909">1909</option>
              <option value="1907">1907</option>
              <option value="1906">1906</option>
              <option value="1904">1904</option>
              <option value="1902">1902</option>
              <option value="1901">1901</option>
              <option value="1810">1810</option>
              <option value="1809">1809</option>
              <option value="1807">1807</option>
              <option value="1806">1806</option>
              <option value="1804">1804</option>
              <option value="1802">1802</option>
              <option value="1801">1801</option>
              <option value="1710">1710</option>
              <option value="1709">1709</option>
              <option value="1707">1707</option>
              <option value="1706">1706</option>
              <option value="1704">1704</option>
              <option value="1702">1702</option>
              <option value="1701">1701</option>
              <option value="1610">1610</option>
              <option value="1609">1609</option>
              <option value="1607">1607</option>
              <option value="1606">1606</option>
              <option value="1604">1604</option>
              <option value="1602">1602</option>
              <option value="1601">1601</option>
              <option value="1511">1511</option>
              <option value="1510">1510</option>
              <option value="1509">1509</option>
              <option value="1507">1507</option>
              <option value="1506">1506</option>
              <option value="1504">1504</option>
              <option value="1503">1503</option>
              <option value="1501">1501</option>
              <option value="1411">1411</option>
              <option value="1409">1409</option>
              <option value="1407">1407</option>
              <option value="1406">1406</option>
              <option value="1404">1404</option>
              <option value="1401">1401</option>
              <option value="1309">1309</option>
            </select>
          </div>

          <div className="input-field col s12">
            <label htmlFor="program">
              Program<span className="text-color-red">*</span>
            </label>

            <br />
            <br />

            <select
              id="program"
              className="browser-default"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                --Please choose an option--
              </option>
              <option value="FSA-NY">FSA-NY</option>
              <option value="GHP-NY">GHP-NY</option>
              <option value="WDF-NY">WDF-NY</option>
              <option value="FLEX-NY">FSA-FLEX</option>
              <option value="REMOTE">FSA-REMOTE</option>
            </select>
          </div>

          <div className="input-field col s12">
            <label htmlFor="location">
              Location<span className="text-color-red">*</span> (Please pick the
              subway station closest to where you live)
            </label>

            <br />
            <br />

            <select
              id="location"
              className="browser-default"
              required
              onChange={handleSelect}
            >
              <option value="" disabled>
                --Please choose an option--
              </option>

              {stations.map(curSubwayStation => (
                <option key={curSubwayStation.id}>
                  {curSubwayStation.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-field">
            <label htmlFor="accessToken">
              Access Token<span className="text-color-red">*</span> (Must match
              the access token you received via email invitation)
            </label>

            <input
              type="text"
              id="accessToken"
              required
              onChange={handleChange}
            />
          </div>

          <button className="btn waves-effect waves-light red lighten-1">
            Sign Up
          </button>

          <div className="red-text center">
            {signUpError ? (
              <div>{signUpError}</div>
            ) : state.accessTokenError ? (
              'Invalid Access Token! Please try again.'
            ) : null}
          </div>
        </form>
      </div>
    );
  }
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  signUpError: state.auth.signUpError,
});

const mapDispatchToProps = dispatch => ({
  signUpThunk(newUser) {
    dispatch(signUpThunkCreator(newUser));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

// Prop Types
SignUp.propTypes = {
  auth: PropTypes.object,
  signUpError: PropTypes.object,
  signUpThunk: PropTypes.func,
};
