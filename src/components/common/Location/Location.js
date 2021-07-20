import React, { useRef, useState } from 'react';
import Select from 'react-select';
import { useIntl } from 'react-intl';
import cn from 'classnames';

import { LOCATION_ID } from 'constants/constants';
import { ReactComponent as LocationIcon } from 'assets/icons/location.svg';
import { useChangeLocation } from 'hooks';
import { useDummyLocationOptionUpdate } from 'hooks/location';
import LocationCustomMenuList from './LocationCustomMenuList';

const labels = {
  placeholder: { id: 'location.placeholder.city' }
};

const Location = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const intl = useIntl();
  const selectRef = useRef();
  const location = useDummyLocationOptionUpdate(selectRef);

  const {
    searchTerm,
    handleInputChange,
    handleOptionClick,
    options,
    isLoading
  } = useChangeLocation();

  const handleTransitionEnd = e => {
    if (e.propertyName === 'width') {
      isLocationOpen && selectRef.current.select.focus();
      setIsDropdownMenuOpen(isLocationOpen);
    }
  };

  const handleCLick = () => setIsLocationOpen(prev => !prev);

  const handleBlur = () => {
    setIsDropdownMenuOpen(false);
    setIsLocationOpen(false);
  };

  const handleOnChange = e => {
    handleOptionClick(e);
    handleBlur();
  };

  return (
    <div
      className={cn('location-dropdown-wrapper', {
        'location-dropdown-wrapper--animate': isLocationOpen
      })}
      onClick={() => selectRef.current.select.focus()}
      onBlur={handleBlur}
      onFocus={handleCLick}
      onTransitionEnd={handleTransitionEnd}
      id={LOCATION_ID}
    >
      <LocationIcon className="location-dropdown-icon" />
      <Select
        placeholder={location || intl.formatMessage(labels.placeholder)}
        options={options}
        menuIsOpen={isDropdownMenuOpen}
        ref={selectRef}
        className="location-dropdown-container"
        classNamePrefix="location-dropdown"
        onChange={handleOnChange}
        onInputChange={handleInputChange}
        inputValue={searchTerm}
        isLoading={isLoading}
        components={{
          IndicatorSeparator: null,
          DropdownIndicator: null,
          MenuList: props => (
            <LocationCustomMenuList {...{ ...props, onCurrentLocationClick: handleBlur }} />
          )
        }}
      />
    </div>
  );
};

export default Location;
