import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Card extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, poster, onHover} = this.props;
    return (
      <article className="small-movie-card catalog__movies-card" onMouseEnter={onHover}>
        <div className="small-movie-card__image">
          <img src={poster} alt={title} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onHover: PropTypes.func.isRequired,
};

export default Card;
