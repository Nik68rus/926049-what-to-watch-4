import {extend} from '../../utils';
import {createMovie} from '../../adapters/films';

const initialState = {
  promoMovie: {},
  films: [],
};

const convertMovies = (movies) => {
  return movies.map((film) => createMovie(film));
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  GET_PROMO: `GET_PROMO`,
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
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {films: action.payload});
    case ActionType.GET_PROMO:
      return extend(state, {promoMovie: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

