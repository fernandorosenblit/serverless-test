import React from 'react';
import { useIntl } from 'react-intl';
import { bool, func } from 'prop-types';

const ReadMore = ({ isTextExpanded, onClick }) => {
  const intl = useIntl();
  const labelId = isTextExpanded ? 'truncate.read_less' : 'truncate.read_more';

  return (
    <button className="read-more-button" onClick={onClick} type="button">
      {intl.formatMessage({ id: labelId })}
    </button>
  );
};

ReadMore.propTypes = {
  isTextExpanded: bool.isRequired,
  onClick: func.isRequired
};

export default ReadMore;
