import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.APPLICATION;

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};

export const getActiveMovie = (state) => {
  return state[NAME_SPACE].activeMovie;
};

export const getCardsToShow = (state) => {
  return state[NAME_SPACE].cardsToShow;
};
