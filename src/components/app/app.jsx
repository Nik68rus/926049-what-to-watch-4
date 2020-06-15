import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';

const App = (props) => {
  const {movie, movies} = props;
  return <Main mainMovie={movie} movieList={movies}/>;
};

App.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired,
  movies: PropTypes.array.isRequired,
};

export default App;
