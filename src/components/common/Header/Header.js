import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

// Components
import MobileMenu from 'components/common/MobileMenu/MobileMenu';
import SearchBar from 'components/search/SearchBar/SearchBar';
import Location from 'components/common/Location/Location';

// Constants
import routes from 'constants/routesPaths';
import { TOP_NAV } from 'constants/navigation';

// Assets
import { ReactComponent as Logo } from 'assets/icons/hollywood-logo.svg';
import { ReactComponent as Profile } from 'assets/icons/profile.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { ReactComponent as Hamburger } from 'assets/icons/hamburger.svg';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const toggleMenuOpen = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <>
      <header>
        <div className={cn('header', { open: menuOpen })}>
          <div className={cn('navigation-container', { open: menuOpen })}>
            <NavLink className="logo" to={routes.index} onClick={closeMenu}>
              <Logo />
            </NavLink>
            {!searchBarVisible && (
              <nav className={cn('navigation', { open: menuOpen })}>
                {TOP_NAV.map(({ intlId, link, exact }) => (
                  <NavLink
                    to={link}
                    key={link}
                    activeClassName="active"
                    exact={exact}
                    onClick={closeMenu}
                  >
                    <FormattedMessage id={intlId} />
                  </NavLink>
                ))}
              </nav>
            )}
          </div>
          {searchBarVisible && <SearchBar hide={() => setSearchBarVisible(false)} />}
          <div className={cn('right-wrapper', { open: menuOpen })}>
            {!searchBarVisible && (
              <div className="search-icon" onClick={() => setSearchBarVisible(true)}>
                <Search />
              </div>
            )}
            <Location />
            <NavLink to={routes.login} onClick={closeMenu}>
              <span className="header-icon">
                <Profile />
              </span>
              <FormattedMessage id="header.login" />
            </NavLink>
          </div>
          <span className="mobile-menu" onClick={toggleMenuOpen}>
            <Hamburger />
          </span>
          <MobileMenu isOpen={menuOpen} hide={toggleMenuOpen} />
        </div>
      </header>
      <div className="header-placeholder" />
    </>
  );
};

export default Header;
