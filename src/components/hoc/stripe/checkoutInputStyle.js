import { mediumGray, error } from 'styles/common/_constants.scss';

export default {
  style: {
    base: {
      fontFamily: 'Inter',
      fontSize: '16px',
      color: mediumGray,
      '::placeholder': {
        color: mediumGray
      },
      fontWeight: '200'
    },
    invalid: {
      color: error
    }
  }
};
