import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './card.jsx';

configure({adapter: new Adapter()});

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

it(`When user click the card correct info in handler`, () => {
  const {id} = movie;
  const handleHover = jest.fn();
  const handleClick = jest.fn();
  const card = shallow(<Card movie={movie} isPlaying={false} onMouseEnter={handleHover} onMouseLeave={handleClick} onClick={handleClick}/>);
  const cardNode = card.find(`article`);
  cardNode.simulate(`click`);
  expect(handleClick).toHaveBeenCalledWith(id);
});
