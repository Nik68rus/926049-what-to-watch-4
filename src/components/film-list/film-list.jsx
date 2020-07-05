import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card.jsx';

const FilmList = (props) => {
  const {films, onCardClick} = props;
  return (
    <div className="catalog__movies-list">
      {films.map((movie) => (
        <Card key={movie.id} movie={movie} onClick={onCardClick}/>
      ))}
    </div>
  );
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default FilmList;
