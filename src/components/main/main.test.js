import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main';

const mockMovie = {
  title: `Test`,
  genre: `Test`,
  date: `Test`
};

it(`Main screen correctly renders after relaunch`, () => {
  const tree = renderer.create(<Main mainMovie={mockMovie} movieList={[`Test1`, `Test2`, `Test3`]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
