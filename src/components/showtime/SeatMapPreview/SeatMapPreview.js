import React from 'react';
import sortBy from 'lodash/sortBy';
import { number, shape, arrayOf } from 'prop-types';
import { useIntl } from 'react-intl';

import { ReactComponent as SmallScreenImage } from 'assets/images/seatMap/small-screen.svg';
import SeatZonePreview from './SeatZonePreview';

const columnsWithMargin = [0, 1];
const labels = {
  title: { id: 'seatmap_preview.screen_title' }
};

const SeatMapPreview = ({ sections }) => {
  const intl = useIntl();
  const zones = sortBy(sections, ['rowIndex', 'columnIndex']);
  let currentRow = 0;
  let mustPrintSeparator;

  return (
    <div className="seat-map-preview">
      <div className="seat-map-preview__screen-zone">
        <SmallScreenImage className="seat-map-preview__screen-image" />
        <span className="seat-map-preview__title caption-two semibold">
          {intl.formatMessage(labels.title)}
        </span>
        <div className="seat-map-preview__seats-zone">
          {zones.map(({ seatAvailableCount, rowIndex, columnIndex }) => {
            const mustAddMargin = columnsWithMargin.includes(columnIndex);
            if (currentRow !== rowIndex) {
              currentRow = rowIndex;
              mustPrintSeparator = true;
            } else {
              mustPrintSeparator = false;
            }
            return mustPrintSeparator ? (
              <React.Fragment key={`seatmap-preview-${rowIndex}-${columnIndex}`}>
                <div className="seat-map-preview__separator" />
                <SeatZonePreview availableSeats={seatAvailableCount} withMargin={mustAddMargin} />
              </React.Fragment>
            ) : (
              <SeatZonePreview
                key={`seatmap-preview-${rowIndex}-${columnIndex}`}
                availableSeats={seatAvailableCount}
                withMargin={mustAddMargin}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

SeatMapPreview.propTypes = {
  sections: arrayOf(
    shape({
      rowIndex: number.isRequired,
      columnIndex: number.isRequired,
      seatAvailableCount: number.isRequired
    })
  )
};

export default SeatMapPreview;
