import React, {PureComponent} from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MoviePage from '../movie-page/movie-page.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/reducer';
import FullScreenPlayer from '../full-screen-player/full-screen-player.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {movie, activeMovie, movies, shown, genres, activeGenre, onGenreClick, onShowMoreClick, onCardClick, isMoviePlaying, onPlayMovieClick} = this.props;
    const currentMovie = activeMovie === `none` ? movies[0] : movies.find((item) => item.id === activeMovie);
    if (isMoviePlaying) {
      return (
        <FullScreenPlayer title= {currentMovie.title} src={currentMovie.src} poster={currentMovie.preview} onExitClick={onPlayMovieClick} isMoviePlaying={isMoviePlaying}/>
      );
    }

    if (activeMovie === `none`) {
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
    const {movie, movies, onCardClick, onPlayMovieClick} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage movie={movie} similarMovies={movies.slice(0, 4)} onCardClick={onCardClick} onPlayMovieClick={onPlayMovieClick}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  activeMovie: PropTypes.string.isRequired,
  shown: PropTypes.number.isRequired,
  isMoviePlaying: PropTypes.bool.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.films[0],
  activeMovie: state.activeMovie,
  isMoviePlaying: state.isMoviePlaying,
  movies: state.cards,
  activeGenre: state.genre,
  genres: [`All genres`, ...new Set(state.films.map((movie) => movie.genre))],
  shown: state.cardsToShow,
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
