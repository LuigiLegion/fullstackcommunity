// Imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Component
const ProjectPreview = ({ project }) => {
  return (
    <div className="card grey lighten-5">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{project.title}</span>

        <div>
          {'Posted by '}
          <span className="text-style-bold text-color-red">
            {`${project.authorFirstName} ${project.authorLastName}`}
          </span>
        </div>

        <div className="grey-text">
          {moment(project.createdAt.toDate()).calendar()}
        </div>
      </div>
    </div>
  );
};

// Prop Types
ProjectPreview.propTypes = {
  project: PropTypes.object,
};

// Exports
export default ProjectPreview;
