import React, {PureComponent} from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MoviePage from '../movie-page/movie-page.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/reducer';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {movie, activeMovie, movies, shown, genres, activeGenre, onGenreClick, onShowMoreClick, onCardClick} = this.props;
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
      />;
    } else {
      const choosenMovie = movies.find((item) => item.id === activeMovie);
      const similarMovies = movies.filter((item) => item.genre === choosenMovie.genre).slice(0, 4);
      return <MoviePage movie={choosenMovie} similarMovies={similarMovies} onCardClick={onCardClick}/>;
    }
  }

  render() {
    const {movie, movies, onCardClick} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage movie={movie} similarMovies={movies.slice(0, 4)} onCardClick={onCardClick}/>
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
  }).isRequired,
  movies: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  activeMovie: PropTypes.string.isRequired,
  shown: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.films[0],
  activeMovie: state.activeMovie,
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
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
