import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signUpThunkCreator } from '../../store/reducers/authReducer';
import * as subwayStationsData from '../../data/nyc-subway-stations.json';

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: '',
      employmentStatus: '',
      location: {},
      invitationKey: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('event.target.id in the handleChange: ', event.target.id);
    console.log('event.target.value in the handleChange: ', event.target.value);
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSelect(event) {
    console.log('event.target.value in the handleSelect: ', event.target.value);
    const location = subwayStationsData.stations.filter(
      curSubwayStation => curSubwayStation.name === event.target.value
    )[0];
    this.setState({
      location,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signUpThunk(this.state);
  }

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="card white">
            <h5 className="grey-text text-darken-3">Sign Up</h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" onChange={this.handleChange} />
            </div>

            <div className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" onChange={this.handleChange} />
            </div>

            <div className="input-field col s12">
              <label htmlFor="gender">Gender</label>
              <br />
              <br />
              <select
                id="gender"
                className="browser-default"
                onChange={this.handleChange}
              >
                <option value="" disabled>
                  --Please choose an option--
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>

            <div className="input-field col s12">
              <label htmlFor="employmentStatus">Employment Status</label>
              <br />
              <br />
              <select
                id="employmentStatus"
                className="browser-default"
                onChange={this.handleChange}
              >
                <option value="" disabled>
                  --Please choose an option--
                </option>
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>

            <div className="input-field col s12">
              <label htmlFor="location">Location</label>
              <br />
              <br />
              <select
                id="location"
                className="browser-default"
                onChange={this.handleSelect}
              >
                <option value="" disabled>
                  --Please choose an option--
                </option>
                {subwayStationsData.stations.map(curSubwayStation => {
                  return (
                    <option key={curSubwayStation.id}>
                      {curSubwayStation.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="input-field">
              <label htmlFor="invitationKey">Invitation Key</label>
              <input
                type="text"
                id="invitationKey"
                onChange={this.handleChange}
              />
            </div>

            <button className="btn red lighten-1 z-depth-0">Sign Up</button>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
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
