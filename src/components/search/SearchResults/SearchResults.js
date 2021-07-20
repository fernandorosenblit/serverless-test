import React, { useState, useEffect } from 'react';
import { arrayOf, object, string, func } from 'prop-types';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl';

// Constants
import { SEARCH_RESULTS_CATEGORIES } from 'constants/constants';

// Components
import Tabs from 'components/common/Tabs/Tabs';
import SearchMatch from 'components/search/SearchMatch/SearchMatch';
import Loading from 'components/common/Loading/Loading';

const SearchResults = ({ className, results, meta, criteria, clearSearch }) => {
  const [category, setCategory] = useState(SEARCH_RESULTS_CATEGORIES.movies);
  const [processedResults, setProcessedResults] = useState({});

  const renderResultsList = () => {
    return (
      <>
        {processedResults && processedResults[category]?.length ? (
          processedResults[category].map((res, index) => (
            <SearchMatch match={res} key={index} category={category} clearSearch={clearSearch} />
          ))
        ) : (
          <div className="empty-state">
            <span className="title">
              <FormattedMessage id="search.empty.title" />
            </span>
            <span>
              <FormattedMessage id="search.empty.message" values={{ criteria: `'${criteria}'` }} />
            </span>
          </div>
        )}
      </>
    );
  };

  const getResultsCount = () => {
    if (!processedResults) return;
    const countSummary = {};

    Object.keys(processedResults).forEach(key => {
      countSummary[key] = processedResults[key].length;
    });

    return countSummary;
  };

  useEffect(() => {
    const resultsForCategory = cat => {
      return results
        .filter(result => Object.keys(result).includes(cat))
        .map(filteredRes => filteredRes[cat]);
    };

    if (results) {
      const tempResults = {};
      Object.values(SEARCH_RESULTS_CATEGORIES).forEach(cat => {
        tempResults[cat] = resultsForCategory(cat);
      });

      setProcessedResults(tempResults);
    }
  }, [results, setProcessedResults]);

  return (
    <>
      {meta && (
        <div className={cn('results-container', className)}>
          {meta.success && (
            <>
              <Tabs
                categories={SEARCH_RESULTS_CATEGORIES}
                selectedCategory={category}
                setCategory={setCategory}
                counts={getResultsCount()}
              />
              <div className="results-list">{renderResultsList()}</div>
            </>
          )}
          {meta.loading && <Loading />}
        </div>
      )}
    </>
  );
};

SearchResults.propTypes = {
  className: string,
  results: arrayOf(object),
  meta: object,
  criteria: string,
  clearSearch: func
};

export default SearchResults;
