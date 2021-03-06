/* eslint-disable react/button-has-type */

// Imports
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createProjectThunkCreator } from '../../store/reducers/projectsReducer';

// Component
const CreateProject = ({ auth, createProjectThunk, history }) => {
  const [state, setState] = useState({
    title: '',
    content: '',
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    createProjectThunk(state);
    history.push('/');
  };

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="container">
        <form onSubmit={handleSubmit} className="card grey lighten-5">
          <h5 className="grey-text text-darken-3">New Project</h5>

          <div className="input-field">
            <label htmlFor="title">
              Project Title: (Describe your idea in one short sentence)
            </label>

            <input
              type="text"
              id="title"
              autoComplete="title"
              required
              onChange={handleChange}
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
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <button className="btn waves-effect waves-light red lighten-1">
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  createProjectThunk(project) {
    dispatch(createProjectThunkCreator(project));
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
  history: PropTypes.object,
};
