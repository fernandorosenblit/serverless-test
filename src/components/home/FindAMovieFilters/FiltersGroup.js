import React from 'react';
import Accordion from 'components/common/Accordion/Accordion';
import { array, func, string, bool } from 'prop-types';
import Checkbox from 'components/common/Checkbox/Checkbox';

const FiltersGroup = ({ type, title, options, onChange, selectedFilters, defaultOpen }) => (
  <div className="fam-filters-group">
    <Accordion title={title} defaultOpen={defaultOpen}>
      {options.map(option => (
        <Checkbox
          key={`${title}-${option.id}`}
          id={option.id}
          label={option.displayName}
          selected={selectedFilters.includes(option.id)}
          onSelect={() => onChange(type, option.id)}
        />
      ))}
    </Accordion>
  </div>
);

export default FiltersGroup;

FiltersGroup.propTypes = {
  title: string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  options: array,
  // eslint-disable-next-line react/forbid-prop-types
  selectedFilters: array,
  type: string.isRequired,
  onChange: func.isRequired,
  defaultOpen: bool
};
