import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main';

const mockMovieList = [
  {
    id: `id1`,
    src: `source`,
    preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `fantasy`,
    date: `2015`,
  },
  {
    id: `id2`,
    src: `source`,
    preview: `img/bohemian-rhapsody.jpg`,
    title: `Bohemian Rhapsody`,
  },
];

it(`Main screen correctly renders after relaunch`, () => {
  const tree = renderer.create(<Main mainMovie={mockMovieList[0]} movieList={mockMovieList} onCardClick={() => {}} genres={[]} activeGenre={``} shown={0} onGenreClick={() => {}} onShowMoreClick={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
