import React from 'react';

const Footer = props => {
  return (
    <div className="page-footer grey darken-4">
      <div className="container">
        <div className="col l6 s12">
          <h5 className="white-text center">
            Fullstack Community is a Fullstack Academy, Starbucks, and Whole
            Foods Market partnership supporting tech education in NYC.
          </h5>
          <br />
          <div className="logos-parent-container">
            <div className="logo-container">
              <a
                className="grey-text text-lighten-3"
                href="https://www.starbucks.com/responsibility/learn-more/relationships"
              >
                <img
                  className="partner-logo"
                  src="https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg"
                  alt="Starbucks Logo"
                />
              </a>
            </div>

            <div className="logo-container">
              <a
                className="grey-text text-lighten-3"
                href="https://www.fullstackacademy.com/"
              >
                <img
                  className="fullstack-logo"
                  src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5153/s300/fsa-logo-stacked.png"
                  alt="Fullstack Logo"
                />
              </a>
            </div>

            <div className="logo-container">
              <a
                className="grey-text text-lighten-3"
                href="https://www.wholefoodsmarket.com/service/local-partnerships"
              >
                <img
                  className="partner-logo"
                  src="https://upload.wikimedia.org/wikipedia/en/7/70/Whole_Foods_Market_2018_Logo.png"
                  alt="Whole Foods Market Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          <strong>© 2019 Fullstack Community</strong>
          <a
            className="grey-text text-lighten-3 right"
            href="https://www.linkedin.com/in/talluigi"
          >
            <strong>Contact Us</strong>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
