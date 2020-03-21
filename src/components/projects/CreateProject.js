/* eslint-disable react/button-has-type */

// Imports
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createProjectThunkCreator } from '../../store/reducers/projectsReducer';

// Component
class CreateProject extends PureComponent {
  state = {
    title: '',
    content: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const newProject = this.state;
    this.props.createProjectThunk(newProject);
    this.props.history.push('/');
  };

  render() {
    const { auth } = this.props;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="card white">
            <h5 className="grey-text text-darken-3">Create a new project:</h5>

            <div className="input-field">
              <label htmlFor="title">
                Project Title: (Describe your idea in one short sentence)
              </label>

              <input
                type="text"
                id="title"
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="input-field">
              <label htmlFor="content">
                Project Description: (Elaborate on your idea and the stack you
                plan to use)
              </label>

              <textarea
                className="materialize-textarea"
                id="content"
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="input-field">
              <button className="btn waves-effect waves-light red lighten-1">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  createProjectThunk(newProject) {
    dispatch(createProjectThunkCreator(newProject));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);

// Prop Types
CreateProject.propTypes = {
  auth: PropTypes.object,
  createProjectThunk: PropTypes.func,
};
