import React, { useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl';
import useOutsideClickHandler from 'hooks/useOutsideClickHandler';
import { useDispatch, useRatingType, useGenre } from 'hooks';

import { showSnackbar, clearSnackbar } from 'state/actions/uiActions';
import { addFilter, clearFilters, removeFilter } from 'state/actions/movieFiltersActions';

import NavigationDrawer from 'components/common/NavigationDrawer/NavigationDrawer';
import IconButton from 'components/common/IconButton/IconButton';
import TextButton from 'components/common/TextButton/TextButton';
import Separator from 'components/common/Separator/Separator';

import { ReactComponent as FilterIcon } from 'assets/icons/filter.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

import Badge from 'components/common/Badge/Badge';
import FiltersGroup from './FiltersGroup';

const FindAMovieFilters = () => {
  const dispatchShowSnackbar = useDispatch(showSnackbar);
  const dispatchClearSnackbar = useDispatch(clearSnackbar);
  const dispatchAddFilter = useDispatch(addFilter);
  const dispatchRemoveFilter = useDispatch(removeFilter);
  const dispatchClearFilters = useDispatch(clearFilters);

  const { selectedFilters } = useSelector(({ movieFilters }) => ({
    selectedFilters: movieFilters
  }));

  const [ratingTypes] = useRatingType();
  const [genreTypes] = useGenre();

  const handleOnChangeFilter = useCallback(
    (type, id) => {
      const idIndex = selectedFilters[type].indexOf(id);
      idIndex === -1 ? dispatchAddFilter({ type, id }) : dispatchRemoveFilter({ type, id });
    },
    [selectedFilters, dispatchAddFilter, dispatchRemoveFilter]
  );

  const [isOpen, setIsOpen] = useState(false);
  const toogleDrawer = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [setIsOpen]);

  const containerRef = useRef(null);

  const handleSnackbarAction = useCallback(() => {
    dispatchClearFilters();
    dispatchClearSnackbar();
  }, [dispatchClearFilters, dispatchClearSnackbar]);

  const handleOpenSnackbar = useCallback(() => {
    dispatchShowSnackbar({
      message: { id: 'fam.filters.quantity', values: { qty: selectedFilters.count } },
      actionLegend: { id: 'fam.filters.clear_all_filters' },
      action: handleSnackbarAction
    });
  }, [selectedFilters, dispatchShowSnackbar, handleSnackbarAction]);

  const handleCloseDrawer = useCallback(() => {
    if (isOpen) {
      toogleDrawer();
      if (selectedFilters.count) handleOpenSnackbar();
    }
  }, [isOpen, selectedFilters, toogleDrawer, handleOpenSnackbar]);

  const handleOpenDrawer = useCallback(() => {
    if (!isOpen) {
      toogleDrawer();
      dispatchClearSnackbar();
    }
  }, [isOpen, dispatchClearSnackbar, toogleDrawer]);

  useOutsideClickHandler(containerRef, handleCloseDrawer);

  return (
    <div ref={containerRef} className={cn('fam-filters', { open: isOpen })}>
      <IconButton onClick={isOpen ? handleCloseDrawer : handleOpenDrawer}>
        {isOpen ? (
          <CloseIcon className="fam-filters__icon" />
        ) : (
          <>
            <FilterIcon className="fam-filters__icon" />
            {selectedFilters.count > 0 && <Badge text={selectedFilters.count} />}
          </>
        )}
      </IconButton>
      <NavigationDrawer isOpen={isOpen}>
        <div className="fam-filters__header">
          <h3 className="no-gutters">
            <FormattedMessage id="fam.filters.title" />
          </h3>
          <TextButton onClick={dispatchClearFilters} semibold capitalize>
            <FormattedMessage id="fam.filters.clear_all" />
          </TextButton>
        </div>
        <div className="fam-filters__wrapper">
          {genreTypes && (
            <>
              <FiltersGroup
                title="Genre"
                type="genre"
                options={genreTypes}
                selectedFilters={selectedFilters.genre}
                onChange={handleOnChangeFilter}
                defaultOpen
              />
              <Separator condensed />
            </>
          )}
          {ratingTypes && (
            <>
              <FiltersGroup
                title="Film Ratings"
                type="rating"
                options={ratingTypes}
                selectedFilters={selectedFilters.rating}
                onChange={handleOnChangeFilter}
              />
              <Separator condensed />
            </>
          )}
        </div>
      </NavigationDrawer>
    </div>
  );
};

export default FindAMovieFilters;
