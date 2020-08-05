import {reducer, ActionType, ActionCreator} from './reducer';
import movies from '../mocks/films';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: `All genres`,
    activeMovie: `none`,
    films: movies,
    cards: movies,
    cardsToShow: 8,
  });
});

it(`Reducer should correctly change genre`, () => {
  expect(reducer({
    genre: `All genres`,
    activeMovie: `none`,
    cardsToShow: 8,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Drama`,
  })).toEqual({
    genre: `Drama`,
    activeMovie: `none`,
    cardsToShow: 8,
  });
});

it(`Reducer should correctly change active movie`, () => {
  expect(reducer({
    genre: `All genres`,
    activeMovie: `none`,
    cardsToShow: 8,
  }, {
    type: ActionType.SHOW_DETAILS,
    payload: `id0`,
  })).toEqual({
    genre: `All genres`,
    activeMovie: `id0`,
    cardsToShow: 8,
  });
});

it(`Reducer should correctly change number of cards to show`, () => {
  expect(reducer({
    genre: `All genres`,
    activeMovie: `none`,
    cardsToShow: 8,
  }, {
    type: ActionType.SHOW_MORE,
    payload: 8,
  })).toEqual({
    genre: `All genres`,
    activeMovie: `none`,
    cardsToShow: 16,
  });
});

describe(`ActionCreator works correctly`, () => {
  it(`ActionCreator for changing genre returns correct action`, () => {
    expect(ActionCreator.changeGenre(`drama`)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: `drama`,
    });
  });

  it(`ActionCreator for changing active movie returns correct action`, () => {
    expect(ActionCreator.setActiveMovie(`id1`)).toEqual({
      type: ActionType.SHOW_DETAILS,
      payload: `id1`,
    });
  });

  it(`ActionCreator for incrementing number of cards to show returns correct action`, () => {
    expect(ActionCreator.showMore(8)).toEqual({
      type: ActionType.SHOW_MORE,
      payload: 8,
    });
  });
});
