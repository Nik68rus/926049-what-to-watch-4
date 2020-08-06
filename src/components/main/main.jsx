import React from 'react';
import PropTypes from 'prop-types';
import FilmList from '../film-list/film-list.jsx';
import GenreList from '../genre-list/genre-list.jsx';
import ShowMoreButton from '../show-more-btn/show-more-btn';
import UserBlock from '../user-block/user-block';
import {connect} from 'react-redux';
import {getUniqueGenres, getPromoMovie, getGenreMovies} from '../../reducer/data/selectors';
import {getGenre, getCardsToShow} from '../../reducer/application/selectors';
import {ActionCreator} from '../../reducer/application/application';
import {Operation as DataOperation} from '../../reducer/data/data';
import {AppRoute} from '../../constants.js';
import {Link} from 'react-router-dom';
import Footer from '../footer/footer.jsx';


const Main = (props) => {
  const {mainMovie, movieList, genres, activeGenre, onGenreClick, onCardClick, onShowMoreClick, shown, onAddToFavorite, onAddPromoToFavoriteClick} = props;
  const {id, isFavorite} = mainMovie;
  return <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={mainMovie.background} alt={`"` + mainMovie.title + `"`} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <UserBlock />

        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={mainMovie.preview} alt={`"` + mainMovie.title + `"`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{mainMovie.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{mainMovie.genre}</span>
                <span className="movie-card__year">{mainMovie.date}</span>
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
                  onAddPromoToFavoriteClick();
                }}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={isFavorite ? `#in-list` : `#add`}></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <GenreList genres={genres} activeGenre={activeGenre} onGenreClick={onGenreClick}/>
        <FilmList films={movieList.slice(0, shown)} onCardClick={onCardClick} />
        {movieList.length > shown ? <ShowMoreButton onShowMoreClick={onShowMoreClick} /> : ``}
      </section>

      <Footer />
    </div>

  </>;
};

Main.propTypes = {
  mainMovie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    background: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  movieList: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired,
  onAddToFavorite: PropTypes.func.isRequired,
  onAddPromoToFavoriteClick: PropTypes.func.isRequired,
  shown: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  mainMovie: getPromoMovie(state),
  movieList: getGenreMovies(state),
  genres: getUniqueGenres(state),
  activeGenre: getGenre(state),
  shown: getCardsToShow(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },

  onShowMoreClick() {
    dispatch(ActionCreator.showMore());
  },

  onAddPromoToFavoriteClick() {
    dispatch(DataOperation.getPromo());
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
