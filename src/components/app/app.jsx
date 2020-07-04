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
    this.state = {
      activeID: -1,
    };
  }

  _renderApp() {
    const {movie, movies, genres, activeGenre, onGenreClick} = this.props;
    const {activeID} = this.state;
    if (activeID === -1) {
      return <Main mainMovie={movie} movieList={movies} genres={genres} activeGenre={activeGenre} onGenreClick={onGenreClick} onCardClick={(id) => {
        this.setState((prevState) => ({prevState, activeID: id}));
      }}/>;
    } else {
      const choosenMovie = movies.find((item) => item.id === this.state.activeID);
      const similarMovies = movies.filter((item) => item.genre === choosenMovie.genre).slice(0, 4);
      return <MoviePage movie={choosenMovie} similarMovies={similarMovies}/>;
    }
  }

  render() {
    const {movie} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage movie={movie} />
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
};

const mapStateToProps = (state) => ({
  movie: state.films[0],
  movies: state.genre === `All genres` ? state.films : state.films.filter((film) => film.genre === state.genre),
  activeGenre: state.genre,
  genres: [`All genres`, ...new Set(state.films.map((movie) => movie.genre))],
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  }});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
