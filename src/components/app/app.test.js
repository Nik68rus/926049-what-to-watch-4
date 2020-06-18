import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const mockMovieList = [
  {
    id: `id1`,
    preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `dramma`,
    date: `2010`
  },
  {
    id: `id2`,
    preview: `img/bohemian-rhapsody.jpg`,
    title: `Bohemian Rhapsody`,
  },
];

it(`App correctly renders after relaunch`, () => {
  const tree = renderer.create(<App movie={mockMovieList[0]} movies={mockMovieList} />).toJSON();
  expect(tree).toMatchSnapshot();
});
