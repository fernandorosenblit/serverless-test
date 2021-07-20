import React, { useRef } from 'react';
import cn from 'classnames';
import { string } from 'prop-types';

// Assets
import { ReactComponent as Location } from 'assets/icons/location.svg';
import { useChangeLocation } from 'hooks';
import { useDummyLocationOptionUpdate } from 'hooks/location';

// Components
import Dropdown from '../Dropdown/Dropdown';

const SearchLocation = ({ className }) => {
  const ref = useRef();
  const location = useDummyLocationOptionUpdate(ref);
  const {
    searchTerm,
    handleInputChange,
    handleOptionClick,
    options,
    isLoading
  } = useChangeLocation();

  return (
    <Dropdown
      placeholder={location}
      options={options}
      className={cn('search-location', className)}
      icon={<Location />}
      iconPlacement="left"
      onChange={handleOptionClick}
      onInputChange={handleInputChange}
      inputValue={searchTerm}
      disableIndicator
      isLoading={isLoading}
      dropdownRef={ref}
    />
  );
};

SearchLocation.propTypes = {
  className: string
};

export default SearchLocation;
