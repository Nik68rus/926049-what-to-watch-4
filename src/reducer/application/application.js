import {extend} from '../../utils';

const CARDS_BATCH = 8;

const initialState = {
  genre: `All genres`,
  activeMovie: 0,
  cards: [],
  cardsToShow: CARDS_BATCH,
  isMoviePlaying: false,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_LIST: `GET_LIST`,
  SHOW_MORE: `SHOW_MORE`,
  SHOW_DETAILS: `SHOW_DETAILS`,
  CHANGE_PLAY_STATUS: `CHANGE_PLAY_STATUS`,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  getList: (genre) => ({
    type: ActionType.GET_LIST,
    payload: genre,
  }),
  showMore: () => ({
    type: ActionType.SHOW_MORE,
    payload: CARDS_BATCH,
  }),
  showDetails: (id) => ({
    type: ActionType.SHOW_DETAILS,
    payload: id,
  }),
  playMovie: (status) => ({
    type: ActionType.CHANGE_PLAY_STATUS,
    payload: !status,
  })
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
    case ActionType.CHANGE_PLAY_STATUS:
      return extend(state, {isMoviePlaying: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
