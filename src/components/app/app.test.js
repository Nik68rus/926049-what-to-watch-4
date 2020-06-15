import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const mockMovie = {
  title: `Test`,
  genre: `Test`,
  date: `Test`
};

it(`App correctly renders after relaunch`, () => {
  const tree = renderer.create(<App movie={mockMovie} movies={[`Test1`, `Test2`, `Test3`]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
