import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signUpThunkCreator } from '../../store/reducers/authReducer';
import * as subwayStationsData from '../../data/nyc-subway-stations.json';

const defaultLocation = subwayStationsData.stations[0];

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: 'Male',
      status: 'Junior',
      company: '',
      cohort: '1907',
      program: 'FSA-NY',
      location: defaultLocation,
      invitationKey: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log('event.target.id: ', event.target.id);
    // console.log('event.target.value: ', event.target.value);
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSelect(event) {
    // console.log('event.target.id: ', event.target.id);
    // console.log('event.target.value: ', event.target.value);
    const location = subwayStationsData.stations.filter(
      curSubwayStation => curSubwayStation.name === event.target.value
    )[0];
    this.setState({
      location,
    });
  }

  handleSubmit(event) {
    // console.log('event.target.id: ', event.target.id);
    // console.log('event.target.value: ', event.target.value);
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
              <input
                type="email"
                id="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Must be in the following order: characters@characters.domain"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}"
                title="Must contain at least one number and one uppercase one, lowercase letter, one digit, and at least 8 or more characters"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                required
                pattern="[A-Za-z]{2,32}"
                title="Must contain uppercase and lowercase letters only, and at least 2 or more characters"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                required
                pattern="[A-Za-z]{2,32}"
                title="Must contain uppercase and lowercase letters only, and at least 2 or more characters"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field col s12">
              <label htmlFor="gender">Gender</label>
              <br />
              <br />
              <select
                id="gender"
                className="browser-default"
                required
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
              <label htmlFor="status">Status</label>
              <br />
              <br />
              <select
                id="status"
                className="browser-default"
                required
                onChange={this.handleChange}
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

            {this.state.status === 'Employed' ? (
              <div className="input-field">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  required
                  pattern="[A-Za-z]+{2,32}"
                  title="Must contain uppercase and lowercase letters only, and at least 2 or more characters"
                  onChange={this.handleChange}
                />
              </div>
            ) : null}

            <div className="input-field col s12">
              <label htmlFor="cohort">Cohort</label>
              <br />
              <br />
              <select
                id="cohort"
                className="browser-default"
                required
                onChange={this.handleChange}
              >
                <option value="" disabled>
                  --Please choose an option--
                </option>
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
              <label htmlFor="program">Program</label>
              <br />
              <br />
              <select
                id="program"
                className="browser-default"
                required
                onChange={this.handleChange}
              >
                <option value="" disabled>
                  --Please choose an option--
                </option>
                <option value="FSA-NY">FSA-NY</option>
                <option value="GH-NY">GH-NY</option>
                <option value="FLEX-NY">FSA-FLEX</option>
                <option value="REMOTE">FSA-REMOTE</option>
                {/* <option value="FSA-CH">FSA-CH</option>
                <option value="GH-NY">GH-CH</option> */}
              </select>
            </div>

            <div className="input-field col s12">
              <label htmlFor="location">
                Location (Please pick the subway station closest to where you
                live)
              </label>
              <br />
              <br />
              <select
                id="location"
                className="browser-default"
                required
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

            {/* <div className="input-field">
              <label htmlFor="invitationKey">Invitation Key</label>
              <input
                type="text"
                id="invitationKey"
                required
                pattern="[A-Za-z]{8,32}"
                title="Must contain uppercase and lowercase letters only, and at least 2 or more characters. Must match the invitation key you received via email"
                onChange={this.handleChange}
              />
            </div> */}

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
