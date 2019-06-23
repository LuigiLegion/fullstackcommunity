import React from 'react';

const Footer = () => {
  return (
    <div className="page-footer grey darken-3">
      <div className="container">
        <div className="col l6 s12">
          <h4 className="white-text center">
            Fullstack Community is a Fullstack Academy and Starbucks partnership
            supporting tech education
          </h4>
          <div className="logos-parent-container">
            {/* <div className="logo-container">
              <a
                className="grey-text text-lighten-3"
                href="https://www.lyft.com/"
              >
                <img
                  className="partner-logo"
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Lyft_logo.svg"
                  alt="Lyft Logo"
                />
              </a>
            </div> */}
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
                href="https://www.starbucks.com/responsibility/learn-more/relationships"
              >
                <img
                  className="partner-logo"
                  src="https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg"
                  alt="Starbucks Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2019 Fullstack Community
          <a
            className="grey-text text-lighten-3 right"
            href="https://github.com/LuigiLegion"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
