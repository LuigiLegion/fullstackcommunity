import React from 'react';
import { NavLink } from 'react-router-dom';

import ProjectSummary from './ProjectSummary';

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
