import React from 'react';
import renderer from 'react-test-renderer';
import FilmList from './film-list.jsx';

const filmList = [{
  id: `id1`,
  src: `source`,
  preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
},
{
  id: `id2`,
  src: `source`,
  preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
}];

it(`FilmList rendered correctly`, () => {
  const tree = renderer.create(<FilmList films={filmList} onCardClick={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
