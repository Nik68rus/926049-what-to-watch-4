import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';


const mockMovieList = [
  {
    id: `id1`,
    src: `source`,
    preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `dramma`,
    date: `2010`,
    actors: [``, ``]
  },
  {
    id: `id2`,
    src: `source`,
    preview: `img/bohemian-rhapsody.jpg`,
    title: `Bohemian Rhapsody`,
    actors: [``, ``]
  },
];

const mockStore = configureStore([]);

it(`App correctly renders after relaunch`, () => {
  const store = mockStore({
    genre: `All genres`,
    activeMovie: `none`,
  });

  const tree = renderer.create(
      <Provider store={store}>
        <App
          movie={mockMovieList[0]}
          movies={mockMovieList}
          genres={[]}
          activeGenre={``}
          onGenreClick={() => {}}
          onShowMoreClick={() => {}}
          onCardClick={() => {}}
          activeMovie={`id1`}
          shown={0}
        />
      </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
