import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './card.jsx';

configure({adapter: new Adapter()});

const mock = {
  id: `id1`,
  preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
};

it(`When user hover the card correct info in handler`, () => {
  const {id} = mock;
  const handleHover = jest.fn();
  const handleClick = jest.fn();
  const card = shallow(<Card movie={mock} onHover={handleHover} onClick={handleClick}/>);
  const cardNode = card.find(`article`);
  cardNode.simulate(`mouseEnter`);
  expect(handleHover).toHaveBeenCalledWith(id);
});

it(`When user click the card correct info in handler`, () => {
  const {id} = mock;
  const handleHover = jest.fn();
  const handleClick = jest.fn();
  const card = shallow(<Card movie={mock} onHover={handleHover} onClick={handleClick}/>);
  const cardNode = card.find(`article`);
  cardNode.simulate(`click`);
  expect(handleClick).toHaveBeenCalledWith(id);
});
