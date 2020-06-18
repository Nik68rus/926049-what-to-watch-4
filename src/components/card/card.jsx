import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Card extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movie, onHover, onClick} = this.props;
    const {preview, title} = movie;
    return (
      <article className="small-movie-card catalog__movies-card" onMouseEnter={() => onHover(movie.id)} onClick={() => onClick(movie.id)}>
        <div className="small-movie-card__image">
          <img src={preview} alt={title} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }
}

Card.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onHover: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
