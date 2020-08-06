import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs.jsx';
import FilmList from '../film-list/film-list.jsx';
import withActiveTab from '../../hocs/with-active-tab/with-active-tab';
import UserBlock from '../user-block/user-block.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {connect} from 'react-redux';
import {getMovies, getComments} from '../../reducer/data/selectors';
import {getActiveMovie} from '../../reducer/application/selectors';
import Footer from '../footer/footer.jsx';


const TabsWraaped = withActiveTab(Tabs);

const getMovieIndex = (movies, id) => movies.map((item) => item.id).indexOf(id);
const getSimilarMovies = (activeMovie, movieList) => movieList.filter((item) => item.genre === activeMovie.genre).slice(0, 4);

const MoviePage = (props) => {
  const {movie, onCardClick, similarMovies, authorizationStatus, comments, onAddToFavorite} = props;
  const {id, title, poster, background, backgroundColor, genre, date, isFavorite} = movie;
  return (
    <Fragment>
      <section className="movie-card movie-card--full" style={{backgroundColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={background} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to={AppRoute.ROOT} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <UserBlock />

          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{date}</span>
              </p>

              <div className="movie-card__buttons">
                <Link className="btn btn--play movie-card__button" to={`${AppRoute.FILMS}/${id}/player`}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list movie-card__button" type="button" onClick={() => {
                  onAddToFavorite(id, isFavorite ? 0 : 1);
                }}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={isFavorite ? `#in-list` : `#add`}></use>
                  </svg>
                  <span>My list</span>
                </button>
                {authorizationStatus === AuthorizationStatus.AUTH ? <Link to={`${AppRoute.FILMS}/${id}/review`} className="btn movie-card__button">Add review</Link> : `` }
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={poster} alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <TabsWraaped movie={movie} comments={comments} />

          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={similarMovies} onCardClick={onCardClick} />
        </section>

        <Footer />
      </div>
    </Fragment>
  );
};

MoviePage.propTypes = {
  movie: PropTypes.object.isRequired,
  similarMovies: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired,
  onAddToFavorite: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  movie: getMovies(state)[getMovieIndex(getMovies(state), getActiveMovie(state))],
  similarMovies: getSimilarMovies(getMovies(state)[getMovieIndex(getMovies(state), getActiveMovie(state))], getMovies(state)),
  comments: getComments(state),
});

export {MoviePage};
export default connect(mapStateToProps)(MoviePage);
