import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card';

const movie = {
  id: `id1`,
  preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
};

it(`Card rendered correctly`, () => {
  const tree = renderer.create(<Card movie={movie} onHover={() => {}} onClick={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
