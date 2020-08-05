import React, {PureComponent} from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
import {Switch, Route, Router} from "react-router-dom";
import MoviePage from '../movie-page/movie-page.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/application/application';
import FullScreenPlayer from '../full-screen-player/full-screen-player.jsx';
import {getUniqueGenres, getGenreMovies} from '../../reducer/data/selectors';
import {getGenre} from '../../reducer/application/selectors';
import SignIn from '../sign-in/sign-in.jsx';
import {getAuthStatus} from '../../reducer/user/selectors';
import {Operation as UserOperation, ActionCreator as UserActionCreator, AuthorizationStatus} from '../../reducer/user/user';
import {Operation as DataOperation} from '../../reducer/data/data';
import NewReview from '../new-review/new-review';
import {AppRoute} from '../../constants';
import history from '../../history';
import MyList from '../my-list/my-list';
import PrivateRoute from '../private-route/private-route';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {onCardClick, onPlayMovieClick, authorizationStatus, onLogin, onAddToFavorite} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT} render={() =>
            <Main
              onCardClick={onCardClick}
              onPlayMovieClick={onPlayMovieClick}
              authorizationStatus={authorizationStatus}
              onAddToFavorite={onAddToFavorite}
            />}/>
          <Route exact path={AppRoute.LOGIN}>
            <SignIn onSubmit={onLogin}/>
          </Route>
          <Route exact path={`${AppRoute.FILMS}/:id/player`}>
            <FullScreenPlayer history={history}/>
          </Route>
          <Route exact path={`${AppRoute.FILMS}/:id/review`}>
            <NewReview history={history} />
          </Route>
          <PrivateRoute exact path={AppRoute.LIST} render={() => {
            return (
              <MyList authorizationStatus={authorizationStatus} onCardClick={onCardClick}/>
            );
          }} />
          <Route exact path={`${AppRoute.FILMS}/:id`} render={() =>
            <MoviePage
              onCardClick={onCardClick}
              onPlayMovieClick={onPlayMovieClick}
              authorizationStatus={authorizationStatus}
              onAddToFavorite={onAddToFavorite}
            />}/>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onLogin: PropTypes.func.isRequired,
  onAddToFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getGenreMovies(state),
  activeGenre: getGenre(state),
  genres: getUniqueGenres(state),
  authorizationStatus: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick(id) {
    dispatch(ActionCreator.setActiveMovie(id));
    dispatch(DataOperation.loadComments(id));
    history.push(`${AppRoute.FILMS}/${id}`);
  },

  onPlayMovieClick(id) {
    dispatch(ActionCreator.playMovie(status));
    history.push(`${AppRoute.FILMS}/${id}/player`);
  },

  onLogin(authData) {
    dispatch(UserOperation.login(authData));
    dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
  },

  onAddToFavorite(id, status) {
    dispatch(DataOperation.changeFavorite(id, status));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
