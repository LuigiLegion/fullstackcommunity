import React from 'react';

const ProjectList = () => {
  return (
    <div className="project-list section">
      <div className="card z-depth-0 project-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">Come up with Stackathon idea</span>
          <p>Posted by Tal Luigi</p>
          <p className="grey-text">June 19th, 12:00</p>
        </div>
      </div>

      <div className="card z-depth-0 project-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">Started Working on Stackathon</span>
          <p>Posted by Tal Luigi</p>
          <p className="grey-text">June 20th, 10:00</p>
        </div>
      </div>

      <div className="card z-depth-0 project-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">Use create-react-app</span>
          <p>Posted by Tal Luigi</p>
          <p className="grey-text">June 20th, 11:00</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
