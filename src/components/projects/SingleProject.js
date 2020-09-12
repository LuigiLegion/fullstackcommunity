// Imports
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';

// Component
const SingleProject = ({ auth, project }) => {
  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  if (project) {
    return (
      <div className="container section project-details">
        <div className="card grey lighten-5">
          <div className="card-content grey lighten-4 text-color-gray">
            <span className="card-title">{project.title}</span>

            <div>{project.content}</div>
          </div>

          <div className="card-action grey lighten-4 grey-text">
            <div>
              {`Posted by ${project.authorFirstName} ${project.authorLastName}`}
            </div>

            <div>{moment(project.createdAt.toDate()).calendar()}</div>

            <br />

            <div className="text-color-gray">
              {`Interested in working with ${project.authorFirstName} on this project?`}
            </div>

            <div className="text-color-gray">
              {`Contact them at `}

              <a
                href={`mailto:${project.authorEmail}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-style-bold text-color-blue">
                  {project.authorEmail}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="dashboard container">
        <div className="section center">
          <div className="card grey lighten-5 center">
            <div className="card-content grey-text text-darken-3 center">
              <div className="message-container">
                <div className="message-containee">Loading project...</div>

                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
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

// Prop Types
SingleProject.propTypes = {
  auth: PropTypes.object,
  project: PropTypes.object,
};

// Exports
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'projects',
    },
  ])
)(SingleProject);
