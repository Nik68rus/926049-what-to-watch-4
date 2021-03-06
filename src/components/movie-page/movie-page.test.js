import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page';

const movie = {
  id: `id0`,
  preview: `img/war-of-the-worlds.jpg`,
  title: `The Grand Budapest Hotel`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  genre: `Drama`,
  date: `2014`,
  rating: 8.9,
  rateCount: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Anderson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
};

it(`Card rendered correctly`, () => {
  const tree = renderer.create(<MoviePage movie={movie} similarMovies={[]} onCardClick={() => {}}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
