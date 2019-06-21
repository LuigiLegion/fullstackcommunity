import React from 'react';

const ProjectDetails = props => {
  const curProjectId = props.match.params.id;
  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content grey lighten-4 black-text">
          <span className="card-title">Project Title: {curProjectId}</span>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by Cody DaPug</div>
          <div>June 19th, 12:00</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
