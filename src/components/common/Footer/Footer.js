import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import Separator from 'components/common/Separator/Separator';

import { BOTTOM_NAV, SOCIAL_NAV } from 'constants/navigation';

import { ReactComponent as Logo } from 'assets/icons/hollywood-logo.svg';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <Logo />
      <div className="navigation-copyright">
        <div className="navigation">
          {BOTTOM_NAV.map(({ intlId, link }) => (
            <NavLink to={link} key={link}>
              <FormattedMessage id={intlId} />
            </NavLink>
          ))}
        </div>
      </div>
      <div className="social">
        {SOCIAL_NAV.map(({ icon: Icon, link }) => (
          <a href={link} key={link} target="_blank" rel="noopener noreferrer">
            <Icon />
          </a>
        ))}
      </div>
    </div>
    <Separator />
    <div className="copyright">
      <FormattedMessage id="footer.copyright" />
    </div>
  </footer>
);

export default Footer;
