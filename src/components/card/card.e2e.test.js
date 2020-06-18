import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './card.jsx';

configure({adapter: new Adapter()});

const mock = {
  id: `id1`,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
};

it(`When user hover the card correct info in handler`, () => {
  const {id} = mock;
  const handleHover = jest.fn();
  const card = shallow(<Card movie={mock} onHover={handleHover} />);
  const cardNode = card.find(`article`);
  cardNode.simulate(`mouseEnter`);
  expect(handleHover).toHaveBeenCalledWith(id);
});
