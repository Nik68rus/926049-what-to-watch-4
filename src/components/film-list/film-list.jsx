import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card.jsx';

class FilmList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: -1,
    };

    this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
  }

  _handleCardMouseEnter(id) {
    this.setState((prevState) => {
      return {
        prevState,
        activeCard: id,
      };
    });
  }

  render() {
    const {films} = this.props;
    return (
      <div className="catalog__movies-list">
        {films.map((movie) => (
          <Card key={movie.id} movie={movie} onHover={() => {
            this._handleCardMouseEnter(movie.id);
          }} />
        ))}
      </div>
    );
  }
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default FilmList;
