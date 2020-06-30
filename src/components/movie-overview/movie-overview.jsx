import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const MovieOverview = (props) => {
  const {movie} = props;
  const {rating, rateCount, description, director, actors} = movie;

  const getTextRate = (number) => {
    switch (true) {
      case number < 3:
        return `Bad`;
      case number >= 3 && number < 5:
        return `Normal`;
      case number >= 5 && number < 8:
        return `Good`;
      case number >= 8 && number < 10:
        return `Very good`;
    }
    return `Awesome`;
  };

  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getTextRate(rating)}</span>
          <span className="movie-rating__count">{rateCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        {description}

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {actors.join(`, `)} and other</strong></p>
      </div>
    </Fragment>
  );
};

MovieOverview.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieOverview;
