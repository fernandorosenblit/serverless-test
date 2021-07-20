import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import playButton from 'assets/icons/play-button.svg';
import conciergeLogo from 'assets/icons/concierge/concierge-logo.svg';
import scrollDown from 'assets/icons/scroll-down.svg';
import conciergeBackground from 'assets/images/concierge-background.png';

import routes from 'constants/routesPaths';
import { DEFAULT_CONCIERGE_PROFILES } from 'constants/constants';

import ConciergeProfileIcon from 'components/concierge/ConciergeProfileIcon/ConciergeProfileIcon';

const Concierge = () => {
  const intl = useIntl();
  return (
    <section className="concierge">
      <div className="concierge-info">
        <div className="concierge-preview-container">
          <img src={conciergeBackground} alt="Concierge background" aria-hidden />
          <img className="concierge-preview-item" src={conciergeLogo} alt="Concierge logo" />
          <button type="button" className="play-trailer-btn">
            <img src={playButton} alt={intl.formatMessage({ id: 'concierge.playTrailer' })} />
          </button>
        </div>
        <NavLink to={routes.concierge} className="concierge-learn-more">
          <FormattedMessage id="concierge.learnMore" />
        </NavLink>
      </div>

      <div className="concierge-details">
        <p className="concierge-description">
          <FormattedMessage id="concierge.anonymousCta" />
        </p>
        <div className="concierge-profiles">
          {DEFAULT_CONCIERGE_PROFILES.map(({ imageSrc, textIntl }, i) => (
            <ConciergeProfileIcon imageSrc={imageSrc} textIntl={textIntl} key={i} />
          ))}
        </div>
        <NavLink to={routes.concierge} className="btn btn--primary btn--outlined setup-concierge">
          <FormattedMessage id="concierge.setupProfile" />
        </NavLink>
        <p className="login-container">
          <FormattedMessage id="concierge.alreadyHaveAccount" />{' '}
          <NavLink to={routes.login} className="primary-color-link">
            <FormattedMessage id="login.title" />
          </NavLink>
        </p>
      </div>

      <img src={scrollDown} alt="" aria-hidden className="scroll-down" />
    </section>
  );
};

export default Concierge;
