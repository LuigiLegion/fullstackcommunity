// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProjectSummary from './ProjectSummary';

// Component
const ProjectList = ({ projects }) => {
  return (
    <div className="project-list section">
      {projects &&
        projects.map(curProject => (
          <NavLink key={curProject.id} to={`/project/${curProject.id}`}>
            <ProjectSummary project={curProject} />
          </NavLink>
        ))}
    </div>
  );
};

export default ProjectList;

// Prop Types
ProjectList.propTypes = {
  projects: PropTypes.array,
};
