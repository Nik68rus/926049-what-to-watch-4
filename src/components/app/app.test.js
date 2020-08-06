import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import NameSpace from '../../reducer/name-space';
import {AuthorizationStatus} from '../../reducer/user/user';

const mockStore = configureStore([]);

const movie = {
  id: 1,
  src: `test.src`,
  preview: `test.preview`,
  title: `Test movie`,
  poster: `test.poster`,
  background: `test.background`,
  backgroundColor: `test.color`,
  genre: `test.genre`,
  date: 0,
  rating: 0,
  rateCount: 0,
  descriptiom: `test.description`,
  director: `test.director`,
  actors: [`test.actor1`],
  runTime: 0,
  isFavorite: false,
};

const comment = {
  id: 0,
  user: {
    id: 0,
    name: `Mollie`,
  },
  rating: 0,
  comment: `test.comment`,
  date: `2020-06-29T16:06:01.831Z`,
};

const user = {
  id: 0,
  email: `test@mail.com`,
  name: `test`,
  avatarUrl: `test.avatarUrl`,
};

it(`App correctly renders after relaunch`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      promoMovie: movie,
      films: [movie],
      favoriteFilms: [movie],
      comments: [comment],
    },
    [NameSpace.APPLICATION]: {
      genre: `All genres`,
      activeMovie: 1,
      cardsToShow: 8,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      user
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <App
          onCardClick={jest.fn()}
          onPlayMovieClick={jest.fn()}
          authorizationStatus={AuthorizationStatus.AUTH}
          onLogin={jest.fn()}
          onAddToFavorite={jest.fn()}
        />
      </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
