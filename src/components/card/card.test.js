import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card';

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

it(`Card rendered correctly`, () => {
  const tree = renderer.create(
      <Card
        movie={movie}
        isPlaying={false}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        onClick={() => {}}
      />).toJSON();
  expect(tree).toMatchSnapshot();
});
