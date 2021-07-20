import React, { useState, useEffect, useRef } from 'react';
import { func, bool } from 'prop-types';
import cn from 'classnames';
import dayjs from 'dayjs';

// Assets
import { ReactComponent as Search } from 'assets/icons/search.svg';

// Hooks
import useOutsideClickHandler from 'hooks/useOutsideClickHandler';
import useSearch from 'hooks/selectors/useSearch';

import Input from 'components/common/Input/Input';
import SearchResults from 'components/search/SearchResults/SearchResults';

const SearchBar = ({ hide, mobile, onFocus, onBlur }) => {
  const containerRef = useRef(null);
  const [searchCriteria, setSearchCriteria] = useState({ text: '', timestamp: '' });
  const [focusLost, setFocusLost] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const handleFocusLost = () => {
    setFocusLost(true);
    setShowResults(false);
    setTimeout(() => {
      !mobile && hide();
    }, 400);

    if (typeof onBlur === 'function') {
      onBlur();
    }
  };

  const updateSearchCriteria = value => {
    setSearchCriteria({
      text: value,
      timestamp: dayjs()
    });
  };

  useOutsideClickHandler(containerRef, handleFocusLost);

  const [searchResults, searchMeta] = useSearch(searchCriteria);

  useEffect(() => {
    if (!showResults && searchCriteria.text.length > 2) setShowResults(true);
    if (showResults && searchCriteria.text.length < 3) setShowResults(false);
  }, [searchCriteria, showResults, setShowResults]);

  return (
    <div ref={containerRef} className="search-bar-container">
      <Input
        placeholder="Search"
        icon={<Search />}
        iconPlacement="left"
        overrides={{
          Wrapper: {
            className: cn({ mobile, animate: !mobile, 'lose-focus': !mobile && focusLost })
          }
        }}
        value={searchCriteria.text}
        onChange={e => updateSearchCriteria(e.target.value)}
        clearSearch={() => updateSearchCriteria('')}
        onFocus={onFocus}
      />
      {showResults && (
        <SearchResults
          results={searchResults}
          meta={searchMeta}
          className={cn({ mobile })}
          criteria={searchCriteria.text}
          clearSearch={() => updateSearchCriteria('')}
        />
      )}
    </div>
  );
};

SearchBar.propTypes = {
  hide: func,
  mobile: bool,
  onFocus: func,
  onBlur: func
};

SearchBar.defaultProps = {
  mobile: false
};

export default SearchBar;
