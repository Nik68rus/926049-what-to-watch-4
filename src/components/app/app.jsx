import React, {PureComponent} from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MoviePage from '../movie-page/movie-page.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeID: -1,
    };
  }

  _renderApp() {
    const {movie, movies} = this.props;
    const {activeID} = this.state;
    if (activeID === -1) {
      return <Main mainMovie={movie} movieList={movies} onCardClick={(id) => {
        this.setState((prevState) => ({prevState, activeID: id}));
      }}/>;
    } else {
      return <MoviePage movie={movies.find((item) => item.id === this.state.activeID)} />;
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
};

export default App;
