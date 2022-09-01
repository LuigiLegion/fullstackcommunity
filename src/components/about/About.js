// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const About = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m12 l12 xl12">
          <div className="section">
            <div className="card white">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                  <span className="text-style-bold">
                    About
                  </span>
                </span>

                <div className="divider" />

                <div className="card-content">
                  <div>
                    Fullstack Community is a social network for coders.
                  </div>

                  <div>
                    I built it as a platform that helps connect past and
                    present Fullstack Academy and Grace Hopper students for
                    networking purposes.
                  </div>

                  <div className="section">
                    The app allows current students and job seeking alums to
                    form study groups, work on projects, practice algorithms,
                    and assist one another in the job search.
                  </div>

                  <div>
                    I hope you like it, enjoy!
                  </div>
                </div>

                <NavLink
                  className="text-style-bold"
                  to="/"
                >
                  ← Back To Main Page
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exports
export default About;
