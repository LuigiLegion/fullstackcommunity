import React, { Component } from 'react';
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
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="card white">
          <h5 className="grey-text text-darken-3">Create a new project:</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
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

const mapDispatchToProps = dispatch => {
  return {
    createProjectThunk: newProject =>
      dispatch(createProjectThunkCreator(newProject)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateProject);
