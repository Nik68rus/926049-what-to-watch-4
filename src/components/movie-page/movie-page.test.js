import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import history from '../../history';
import {AuthorizationStatus} from '../../reducer/user/user';
import NameSpace from '../../reducer/name-space';

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

const movies = [{
  id: 2,
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
}];

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
  id: 3,
  email: `test@mail.com`,
  name: `test`,
  avatarUrl: `test.avatarUrl`,
};


it(`Card rendered correctly`, () => {
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
        <Router history={history}>
          <MoviePage
            movie={movie}
            similarMovies={movies}
            onCardClick={jest.fn()}
            onPlayMovieClick={jest.fn()}
            onAddToFavorite={jest.fn()}
            authorizationStatus={AuthorizationStatus.AUTH}
            comments={[comment]}
          />
        </Router>
      </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
