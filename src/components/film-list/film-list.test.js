import React from 'react';
import renderer from 'react-test-renderer';
import FilmList from './film-list.jsx';

const filmList = [{
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
}, {
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

it(`FilmList rendered correctly`, () => {
  const tree = renderer.create(<FilmList films={filmList} onCardClick={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
