import {extend} from '../utils';
import films from '../mocks/films';

const initialState = {
  genre: `All genres`,
  films,
};

const getMovies = (list, genre) => {
  return list.filter((item) => item.genre === genre);
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_LIST: `GET_LIST`,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  getList: (movies, genre) => ({
    type: ActionType.GET_LIST,
    payload: getMovies(movies, genre),
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {genre: action.payload});
    case ActionType.GET_LIST:
      return extend(state, {filmsToShow: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
