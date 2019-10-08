import React from 'react';

const Spaces = props => {
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <strong>Work Spaces</strong>
          </span>
          <ul className="notifications">
            <li>
              <span className="red-text-color">
                <strong>Free working spaces at AWS Loft</strong>
              </span>
              <div>350 West Broadway, New York</div>
              <div className="events-time-and-rsvp-container">
                <div className="grey-text note-date events-time-and-rsvp-containee">
                  Open Monday-Friday, 9:30am-5:30pm
                </div>
                <a
                  className="events-time-and-rsvp-containee"
                  href="https://aws.amazon.com/start-ups/loft/ny-loft"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="right">
                    <strong>RSVP</strong>
                  </span>
                </a>
              </div>
            </li>
            <li>
              <span className="red-text-color">
                <strong>Free working spaces at Freelancers Hub</strong>
              </span>
              <div>30 John Street, Brooklyn</div>
              <div className="events-time-and-rsvp-container">
                <div className="grey-text note-date events-time-and-rsvp-containee">
                  Get up to 8 free work spaces a month
                </div>
                <a
                  className="events-time-and-rsvp-containee"
                  href="https://freelancershub.nymediacenter.com/member/daypass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="right">
                    <strong>RSVP</strong>
                  </span>
                </a>
              </div>
            </li>
            <li>
              <span className="red-text-color">
                <strong>Hacker Hours at Fullstack Academy of Code</strong>
              </span>
              <div>5 Hanover Square, New York</div>
              <div className="events-time-and-rsvp-container">
                <div className="grey-text note-date events-time-and-rsvp-containee">
                  Every second Monday of the month
                </div>
                <a
                  className="events-time-and-rsvp-containee"
                  href="https://www.eventbrite.com/e/hacker-hours-at-fullstack-academy-tickets-69206545641?aff=erelexpmlt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="right">
                    <strong>RSVP</strong>
                  </span>
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
