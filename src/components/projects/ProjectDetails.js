// Imports
import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';

// Component
const ProjectDetails = ({ auth, project }) => {
  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  if (project) {
    return (
      <div className="container section project-details">
        <div className="card">
          <div className="card-content grey lighten-4 black-text">
            <span className="card-title">{project.title}</span>

            <div>{project.content}</div>
          </div>

          <div className="card-action grey lighten-4 grey-text">
            <div>
              Posted by {`${project.authorFirstName} ${project.authorLastName}`}
            </div>

            <div>{moment(project.createdAt.toDate()).calendar()}</div>

            <br />

            <div style={{ color: 'black' }}>
              {`Interested in working with ${project.authorFirstName} on this project?`}
            </div>

            <div>
              <span style={{ color: 'black' }}>
                Contact them at{' '}
                <a
                  href={`mailto:${project.authorEmail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#039be5' }}
                >
                  <strong>{project.authorEmail}</strong>
                </a>
              </span>

              <NavLink
                style={{ color: '#ef5350' }}
                activeClassName="right"
                to="/"
              >
                <strong>Back</strong>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <div>Loading Project...</div>
      </div>
    );
  }
};

// Container
const mapStateToProps = (state, ownProps) => {
  const curProjectId = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[curProjectId] : null;

  return {
    auth: state.firebase.auth,
    project,
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

// Prop Types
ProjectDetails.propTypes = {
  auth: PropTypes.object,
  project: PropTypes.object,
};
