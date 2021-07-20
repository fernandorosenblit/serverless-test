import React from 'react';
import { arrayOf, object, func, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Showtime from 'components/showtime/DateShowtimeSelector/Showtime';

const ShowtimeMenuPanel = ({ options = [], selectedShowtime, onChange }) => (
  <div className="showtime-menu-panel">
    {options.map(({ header, options }, index) => (
      <div key={index}>
        <h2 className="showtime-menu-panel-header body2">
          <FormattedMessage id={header} defaultMessage={header} />
        </h2>
        {options.map((option, index) => (
          <Showtime
            key={index}
            {...option}
            isSelected={selectedShowtime === option.id}
            onChange={onChange}
          />
        ))}
      </div>
    ))}
  </div>
);

ShowtimeMenuPanel.propTypes = {
  options: arrayOf(object),
  selectedShowtime: string,
  onChange: func.isRequired
};

export default ShowtimeMenuPanel;
