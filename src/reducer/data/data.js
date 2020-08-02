import {extend} from '../../utils';
import {createMovie} from '../../adapters/films';

const initialState = {
  promoMovie: {},
  films: [],
  comments: [],
};

const convertMovies = (movies) => {
  return movies.map((film) => createMovie(film));
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  GET_PROMO: `GET_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  POST_COMMENT: `POST_COMMENT`,
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
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

