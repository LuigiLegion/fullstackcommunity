// Imports
import React from 'react';

// Component
const Spaces = () => {
  return (
    <div className="section">
      <div className="card grey lighten-5">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title text-style-bold">Work Spaces</span>

          <ul className="notifications">
            <li>
              <span className="text-style-bold text-color-red">
                Free working spaces at AWS Loft
              </span>

              <div>350 West Broadway, New York</div>

              <div className="events-time-and-rsvp-container">
                <div className="grey-text events-time-and-rsvp-containee">
                  Open Monday through Friday, 9:30 AM - 5:30PM
                </div>

                <a
                  className="events-time-and-rsvp-containee"
                  href="https://aws.amazon.com/start-ups/loft/ny-loft"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="right text-style-bold">RSVP</span>
                </a>
              </div>
            </li>

            <li>
              <span className="text-style-bold text-color-red">
                Free working spaces at Freelancers Hub
              </span>

              <div>30 John Street, Brooklyn</div>

              <div className="events-time-and-rsvp-container">
                <div className="grey-text events-time-and-rsvp-containee">
                  Get up to 8 free work spaces a month
                </div>

                <a
                  className="events-time-and-rsvp-containee"
                  href="https://freelancershub.nymediacenter.com/member/daypass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="right text-style-bold">RSVP</span>
                </a>
              </div>
            </li>

            <li>
              <span className="text-style-bold text-color-red">
                Hacker Hours at Fullstack Academy of Code
              </span>

              <div>5 Hanover Square, New York</div>

              <div className="events-time-and-rsvp-container">
                <div className="grey-text events-time-and-rsvp-containee">
                  Every second Monday of the month, 6:30 PM - 9:30 PM
                </div>

                <a
                  className="events-time-and-rsvp-containee"
                  href="https://www.eventbrite.com/e/hacker-hours-at-fullstack-academy-tickets-98250793769?aff=erelexpmlt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="right text-style-bold">RSVP</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Spaces;
