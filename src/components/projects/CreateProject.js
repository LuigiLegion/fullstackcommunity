import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { createProjectThunkCreator } from '../../store/reducers/projectReducer';

class CreateProject extends Component {
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
                Project Title: (What is your idea in one short sentence)
              </label>
              <input type="text" id="title" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="content">
                Project Content: (Elaborate on your idea and the stack you plan
                to use)
              </label>
              <textarea
                className="materialize-text-area"
                id="content"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <button className="btn red lighten-1 z-depth-0">Submit</button>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    createProjectThunk: newProject =>
      dispatch(createProjectThunkCreator(newProject)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
