import React from 'react';
import { object } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import TextButton from '../TextButton/TextButton';

const SnackMessage = ({ data }) => {
  const { message, actionLegend, action } = data;

  return (
    <div className="snackbar">
      <span className="body1">
        <FormattedMessage id={message.id} values={message.values ?? {}} />
      </span>
      {actionLegend && action && (
        <>
          <span className="snackbar__divider" />
          <TextButton semibold capitalize onClick={action}>
            <FormattedMessage id={actionLegend.id} values={actionLegend.values ?? {}} />
          </TextButton>
        </>
      )}
    </div>
  );
};

export default SnackMessage;

SnackMessage.propTypes = {
  data: object.isRequired
};
