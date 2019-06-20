import React from 'react';
import ProjectSummary from './ProjectSummary';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list section">
      {projects &&
        projects.map(curProject => (
          <ProjectSummary key={curProject.id} project={curProject} />
        ))}
    </div>
  );
};

export default ProjectList;
