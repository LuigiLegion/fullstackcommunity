import React from 'react';

const HackerHours = props => {
    return (
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                    <strong>Hacker Hours at Fullstack Academy</strong>
                </span>
                    <ul className="notifications">
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
                            href="https://www.eventbrite.com/e/hacker-hours-at-fullstack-academy-tickets-63423943723?aff=erelexpmlt"
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
    )
}

export default HackerHours;
