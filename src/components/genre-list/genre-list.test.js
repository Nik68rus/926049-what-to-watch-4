import React from 'react';
import renderer from 'react-test-renderer';
import GenreList from './genre-list';

const genres = [`drama`, `horror`, `sci-fi`];
const activeGenre = `drama`;
const onGenreClick = jest.fn();

it(`GenreList renders correctly`, () => {
  const tree = renderer.create(<GenreList genres={genres} activeGenre={activeGenre} onGenreClick={onGenreClick} />).toJSON();
  expect(tree).toMatchSnapshot();
});
