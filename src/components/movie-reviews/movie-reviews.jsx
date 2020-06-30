import React from 'react';
import PropTypes from 'prop-types';

const MovieReviews = (props) => {
  const {comments} = props;
  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {comments.slice(0, comments.length / 2).map((comment) => (
          <div className="review" key={comment.id}>
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>
        ))}

      </div>
      <div className="movie-card__reviews-col">
        {comments.slice(comments.length / 2).map((comment) => (
          <div className="review" key={comment.id}>
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>
        ))}
      </div>
    </div>

  );
};

MovieReviews.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default MovieReviews;
