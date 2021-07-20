import { number, string } from 'prop-types';
import React from 'react';
import { runtimeToHs } from 'utils/movieUtils';

const MovieRuntime = ({ runtime, className }) =>
  runtime ? <span className={className}>{runtimeToHs(runtime)}</span> : null;

MovieRuntime.propTypes = {
  runtime: number,
  className: string
};

export default MovieRuntime;
