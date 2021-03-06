/* eslint-disable react/button-has-type */

// Imports
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signInThunkCreator } from '../../store/reducers/authReducer';

// Component
const SignIn = ({ auth, signInError, signInThunk }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    signInThunk(state);
  };

  if (auth.uid) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container">
        <form onSubmit={handleSubmit} className="card grey lighten-5">
          <h5 className="grey-text text-darken-3">Sign In</h5>

          <div className="input-field">
            <label htmlFor="email">
              Email<span className="text-color-red">*</span>
            </label>

            <input
              type="email"
              id="email"
              autoComplete="current-email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">
              Password<span className="text-color-red">*</span>
            </label>

            <input
              type="password"
              id="password"
              autoComplete="current-password"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <button className="btn waves-effect waves-light red lighten-1">
              Sign In
            </button>
          </div>

          <div className="red-text center">
            {signInError ? <div>{signInError}</div> : null}
          </div>
        </form>
      </div>
    );
  }
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  signInError: state.auth.signInError,
});

const mapDispatchToProps = dispatch => ({
  signInThunk(userCredentials) {
    dispatch(signInThunkCreator(userCredentials));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

// Prop Types
SignIn.propTypes = {
  auth: PropTypes.object,
  signInError: PropTypes.object,
  signInThunk: PropTypes.func,
};
