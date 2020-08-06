import {extend} from '../../utils';
import {createMovie} from '../../adapters/films';

import {ActionCreator as ApplicationActionCreator} from '../application/application';

const initialState = {
  promoMovie: {
    id: 0,
    preview: ``,
    title: ``,
    genre: ``,
    date: 0,
    background: ``,
    isFavorite: false,
  },
  films: [],
  favoriteFilms: [],
  comments: [],
};

const convertMovies = (movies) => {
  return movies.map((film) => createMovie(film));
};

const actualizeFilms = (films, promo, id) => {
  const newPromo = Object.assign(promo);
  newPromo.isFavorite = newPromo.id === id ? !newPromo.isFavorite : newPromo.isFavorite;
  const movieIndex = films.findIndex((film) => film.id === id);
  const newMovies = films;
  newMovies[movieIndex].isFavorite = !films[movieIndex].isFavorite;
  const difference = {films: newMovies, promoMovie: newPromo};
  return difference;
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  GET_PROMO: `GET_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  POST_COMMENT: `POST_COMMENT`,
  GET_FAVORITE: `GET_FAVORITE`,
  CHANGE_FAVORITE: `CHANGE_FAVORITE`,
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: convertMovies(movies),
  }),
  getPromo: (movie) => ({
    type: ActionType.GET_PROMO,
    payload: createMovie(movie),
  }),
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),
  getFavorite: (list) => ({
    type: ActionType.GET_FAVORITE,
    payload: list,
  }),
  changeFavorite: (film) => ({
    type: ActionType.CHANGE_FAVORITE,
    payload: film.id,
  })
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
    .then((response) => {
      dispatch(ActionCreator.loadMovies(response.data));
    });
  },

  getPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
    .then((response) => {
      dispatch(ActionCreator.getPromo(response.data));
      dispatch(ApplicationActionCreator.setActiveMovie(response.data.id));
    });
  },

  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
    .then((response) => {
      dispatch(ActionCreator.loadComments(response.data));
    });
  },

  postComment: (comment, movieID) => (dispatch, getState, api) => {
    return api.post(`/comments/${movieID}`, comment)
    .then((response) => {
      dispatch(ActionCreator.loadComments(response.data));
    });
  },

  getFavorite: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
    .then((response) => {
      dispatch(ActionCreator.getFavorite(response.data));
    });
  },

  changeFavorite: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`)
    .then((response) => {
      dispatch(ActionCreator.changeFavorite(response.data));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {films: action.payload});
    case ActionType.GET_PROMO:
      return extend(state, {promoMovie: action.payload});
    case ActionType.LOAD_COMMENTS:
      return extend(state, {comments: action.payload});
    case ActionType.GET_FAVORITE:
      return extend(state, {favoriteFilms: action.payload});
    case ActionType.CHANGE_FAVORITE:
      return extend(state, actualizeFilms(state.films, state.promoMovie, action.payload));
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

