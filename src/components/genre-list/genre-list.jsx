import React from 'react';
import PropTypes from 'prop-types';

const GenreList = (props) => {
  const {genres, activeGenre, onGenreClick} = props;
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item ${genre === activeGenre ? `catalog__genres-item--active` : ``}`}>
          <a href="#" className="catalog__genres-link" onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(evt.target.textContent);
          }}>{genre}</a>
        </li>
      ))}
    </ul>);
};

GenreList.propTypes = {
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

export default GenreList;
