import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';

const ProjectDetails = props => {
  const { project, auth } = props;
  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content grey lighten-4 black-text">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Posted by {`${project.authorFirstName} ${project.authorLastName}`}
            </div>

            <div>{moment(project.createdAt.toDate()).calendar()}</div>
            <br />
            <div style={{ color: 'black' }}>{`Interested in working with ${
              project.authorFirstName
            } on this project?`}</div>
            <div style={{ color: 'black' }}>{`Contact them at ${
              project.authorEmail
            }`}</div>
            <br />
            <NavLink style={{ color: '#ef5350' }} to="/">
              <strong>Back</strong>
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading Project...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const curProjectId = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[curProjectId] : null;
  return {
    project,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'projects',
    },
  ])
)(ProjectDetails);
