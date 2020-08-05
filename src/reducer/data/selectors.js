import {createSelector} from 'reselect';
import NameSpace from '../name-space';
import {getGenre} from '../application/selectors';

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => {
  return state[NAME_SPACE].films;
};

export const getPromoMovie = (state) => {
  return state[NAME_SPACE].promoMovie;
};

export const getUniqueGenres = createSelector(getMovies, (movies) => {
  return [`All genres`, ...new Set(movies.map((movie) => movie.genre))];
});

export const getGenreMovies = createSelector(getMovies, getGenre, (films, genre) => {
  return genre === `All genres` ? films : films.filter((item) => item.genre === genre);
});

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};

