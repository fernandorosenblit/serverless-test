import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ReactComponent as NoMoviePlaceholder } from 'assets/icons/no-movies.svg';

const NoMovies = ({ category }) => {
  return (
    <div className="no-movies">
      <NoMoviePlaceholder />
      <FormattedMessage id={`fam.noMovies.${category}`} />
    </div>
  );
};

NoMovies.propTypes = {
  category: string
};

export default NoMovies;
