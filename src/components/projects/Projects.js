// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ProjectPreview } from '..';

// Component
const Projects = ({ projects }) => {
  return (
    <div className="section">
      {projects &&
        projects.map(curProject => (
          <NavLink
            key={curProject.id}
            to={`/project/${curProject.id}`}
            className="project-preview-link"
          >
            <ProjectPreview project={curProject} />
          </NavLink>
        ))}
    </div>
  );
};

// Prop Types
Projects.propTypes = {
  projects: PropTypes.array,
};

// Exports
export default Projects;
