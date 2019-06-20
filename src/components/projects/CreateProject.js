import React, { Component } from 'react';

export class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
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

export default CreateProject;
