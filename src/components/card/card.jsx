import React from 'react';
import PropTypes from 'prop-types';
import Player from '../video-player/video-player.jsx';
import withVideo from '../../hocs/with-video/with-video';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';

const VideoPlayer = withVideo(Player);

const Card = (props) => {
  const {movie, onClick, isPlaying, onMouseEnter, onMouseLeave} = props;
  const {preview, title, src} = movie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(movie.id)}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          isPlaying={isPlaying}
          src={src}
          poster={preview}
        />
        <img src={preview} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

Card.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default Card;
