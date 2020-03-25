// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const PageNotFound = () => {
  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m12">
          <div className="section">
            <div className="card grey lighten-5">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                  <span className="text-style-bold">404 - Page Not Found</span>
                </span>

                <h5 className="grey-text text-darken-3">
                  This route does not exist.
                </h5>

                <br />

                <ul>
                  <li>
                    <NavLink to="/">
                      <span className="text-style-bold">
                        ← Back To Main Page
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
