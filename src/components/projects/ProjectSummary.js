// Imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Component
const ProjectSummary = ({ project }) => {
  return (
    <div className="card project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{project.title}</span>

        <div>
          Posted by{' '}
          <span className="red-text-color">
            <strong>{`${project.authorFirstName} ${project.authorLastName}`}</strong>
          </span>
        </div>

        <div className="grey-text">
          {moment(project.createdAt.toDate()).calendar()}
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;

// Prop Types
ProjectSummary.propTypes = {
  project: PropTypes.object,
};
