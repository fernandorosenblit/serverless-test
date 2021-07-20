import React, { useState } from 'react';
import { connect } from 'react-redux';
import { object, arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Constants
import { CATEGORIES } from 'constants/findAMovie';

// Selectors
import { getMoviesByReleaseStatus, getMoviesByOnSaleDate } from 'selectors/movieSelector';

// Assets
import { ReactComponent as Search } from 'assets/icons/search.svg';

// Components
import Input from 'components/common/Input/Input';
import MovieCarousel from 'components/movie/MovieCarousel/MovieCarousel';
import Tabs from 'components/common/Tabs/Tabs';

const FindAMovie = ({ onSale, comingSoon, openingThisWeek, meta }) => {
  const [category, setCategory] = useState(CATEGORIES.onSale);
  const [searchCriteria, setSearchCriteria] = useState('');

  return (
    <section className="fam-section">
      <div className="fam-section__header">
        <h3>
          <FormattedMessage id="fam.title" />
        </h3>
        <Input
          placeholder="Search"
          icon={<Search />}
          iconPlacement="left"
          overrides={{ Wrapper: { className: 'show-for-large' } }}
          value={searchCriteria}
          onChange={e => setSearchCriteria(e.value)}
        />
      </div>
      <Tabs categories={CATEGORIES} selectedCategory={category} setCategory={setCategory} />
      {category === CATEGORIES.onSale && (
        <MovieCarousel movieList={onSale} meta={meta} category={category} />
      )}
      {category === CATEGORIES.comingSoon && (
        <MovieCarousel movieList={comingSoon} meta={meta} category={category} />
      )}
      {category === CATEGORIES.openingThisWeek && (
        <MovieCarousel movieList={openingThisWeek} meta={meta} category={category} />
      )}
    </section>
  );
};

FindAMovie.propTypes = {
  onSale: arrayOf(object),
  comingSoon: arrayOf(object),
  openingThisWeek: arrayOf(object),
  meta: object
};

const mapState = state => ({
  onSale: getMoviesByOnSaleDate(state, CATEGORIES.onSale),
  comingSoon: getMoviesByOnSaleDate(state, CATEGORIES.comingSoon),
  openingThisWeek: getMoviesByReleaseStatus(state, CATEGORIES.openingThisWeek)
});

export default connect(mapState)(FindAMovie);
