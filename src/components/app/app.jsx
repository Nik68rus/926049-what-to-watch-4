import React, {PureComponent} from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MoviePage from '../movie-page/movie-page.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/application/application';
import FullScreenPlayer from '../full-screen-player/full-screen-player.jsx';
import {getUniqueGenres, getPromoMovie, getGenreMovies} from '../../reducer/data/selectors';
import {getGenre, getActiveMovie, getPlayingStatus, getCardsToShow} from '../../reducer/application/selectors';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {movie, activeMovie, movies, shown, genres, activeGenre, onGenreClick, onShowMoreClick, onCardClick, isMoviePlaying, onPlayMovieClick} = this.props;
    const currentMovie = activeMovie === 0 ? {} : movies.find((item) => item.id === activeMovie);
    if (isMoviePlaying) {
      return (
        <FullScreenPlayer title= {currentMovie.title} src={currentMovie.src} poster={currentMovie.preview} onExitClick={onPlayMovieClick} isMoviePlaying={isMoviePlaying}/>
      );
    }

    if (activeMovie === 0) {
      return <Main
        mainMovie={movie}
        movieList={movies}
        genres={genres}
        activeGenre={activeGenre}
        onGenreClick={onGenreClick}
        onShowMoreClick={onShowMoreClick}
        onCardClick={onCardClick}
        shown={shown}
        onPlayMovieClick={onPlayMovieClick}
        isMoviePlaying={isMoviePlaying}
      />;
    } else {
      const choosenMovie = movies.find((item) => item.id === activeMovie);
      const similarMovies = movies.filter((item) => item.genre === choosenMovie.genre).slice(0, 4);
      return <MoviePage movie={choosenMovie} similarMovies={similarMovies} onCardClick={onCardClick} onPlayMovieClick={onPlayMovieClick}/>;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  activeMovie: PropTypes.number.isRequired,
  shown: PropTypes.number.isRequired,
  isMoviePlaying: PropTypes.bool.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: getPromoMovie(state),
  activeMovie: getActiveMovie(state),
  isMoviePlaying: getPlayingStatus(state),
  movies: getGenreMovies(state),
  activeGenre: getGenre(state),
  genres: getUniqueGenres(state),
  shown: getCardsToShow(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.getList(genre));
  },

  onShowMoreClick() {
    dispatch(ActionCreator.showMore());
  },

  onCardClick(id) {
    dispatch(ActionCreator.showDetails(id));
  },

  onPlayMovieClick(status) {
    dispatch(ActionCreator.playMovie(status));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
