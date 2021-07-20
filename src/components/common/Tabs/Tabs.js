import React from 'react';
import { object, func, string } from 'prop-types';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl';

const Tabs = ({ categories, selectedCategory, setCategory, counts }) => {
  return (
    <div className="tabs-container">
      {Object.keys(categories).map(key => (
        <div
          className={cn('tab', { active: selectedCategory === categories[key] })}
          key={categories[key]}
          onClick={() => setCategory(categories[key])}
        >
          <FormattedMessage id={`tabs.${categories[key]}`} />
          {counts && <span className="count">({counts[categories[key]] || 0})</span>}
        </div>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  categories: object.isRequired,
  selectedCategory: string.isRequired,
  setCategory: func.isRequired,
  counts: object
};

export default Tabs;
