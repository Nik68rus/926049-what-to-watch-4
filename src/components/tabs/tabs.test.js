import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs';

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

it(`Tabs renders correctly`, () => {
  const tree = renderer.create(
      <Tabs
        movie={movie}
        activeTab={`test`}
        onTabClick={jest.fn()}
        comments={[comment]}
      />).toJSON();
  expect(tree).toMatchSnapshot();
});

