import React, { useState } from 'react';
import { bool, func } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

// Components
import SearchBar from 'components/search/SearchBar/SearchBar';
import Button from 'components/common/Button/Button';

// Constants
import routes from 'constants/routesPaths';
import { TOP_NAV } from 'constants/navigation';

// Assets
import { ReactComponent as Logo } from 'assets/icons/mobile-logo.svg';
import { ReactComponent as Close } from 'assets/icons/close.svg';
import { ReactComponent as Profile } from 'assets/icons/profile.svg';

const MobileMenu = ({ isOpen, hide }) => {
  const [searchHasFocus, setHasFocus] = useState(false);

  return (
    <div className={cn('menu-container', { open: isOpen })}>
      <div className="menu-container__header">
        <NavLink className="mobile-logo" to={routes.index} onClick={hide}>
          <Logo />
        </NavLink>
        <div className="menu-container__close" onClick={hide}>
          <Close />
        </div>
      </div>
      <div className="menu-container__search">
        <SearchBar mobile onFocus={() => setHasFocus(true)} onBlur={() => setHasFocus(false)} />
        {searchHasFocus && (
          <Button link className="menu-container__cancel-search" onClick={() => {}}>
            <FormattedMessage id="header.mobile.cancel" />
          </Button>
        )}
      </div>
      <nav className="menu-container__navigation">
        {TOP_NAV.map(({ intlId, link, exact }) => (
          <NavLink to={link} key={link} activeClassName="active" exact={exact} onClick={hide}>
            <FormattedMessage id={intlId} />
          </NavLink>
        ))}
        <NavLink to={routes.login} onClick={hide}>
          <span className="header-icon">
            <Profile />
          </span>
          <FormattedMessage id="header.login" />
        </NavLink>
      </nav>
      <div className="menu-container__footer">
        <NavLink className="mobile-logo" to={routes.index} onClick={hide}>
          <Logo />
        </NavLink>
        <FormattedMessage id="footer.copyright" />
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  isOpen: bool.isRequired,
  hide: func.isRequired
};

export default MobileMenu;
