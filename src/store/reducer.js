import {extend} from '../utils';
import films from '../mocks/films';
const CARDS_BATCH = 8;

const initialState = {
  genre: `All genres`,
  activeMovie: `none`,
  films,
  cards: films,
  cardsToShow: CARDS_BATCH,
};

const getMovies = (genre) => {
  return genre === `All genres` ? films : films.filter((item) => item.genre === genre);
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_LIST: `GET_LIST`,
  SHOW_MORE: `SHOW_MORE`,
  SHOW_DETAILS: `SHOW_DETAILS`,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  getList: (movies, genre) => ({
    type: ActionType.GET_LIST,
    payload: getMovies(movies, genre),
  }),
  showMore: () => ({
    type: ActionType.SHOW_MORE,
    payload: CARDS_BATCH,
  }),
  showDetails: (id) => ({
    type: ActionType.SHOW_DETAILS,
    payload: id,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {genre: action.payload, cardsToShow: CARDS_BATCH});
    case ActionType.GET_LIST:
      return extend(state, {cards: action.payload});
    case ActionType.SHOW_MORE:
      return extend(state, {cardsToShow: state.cardsToShow + action.payload});
    case ActionType.SHOW_DETAILS:
      return extend(state, {activeMovie: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
