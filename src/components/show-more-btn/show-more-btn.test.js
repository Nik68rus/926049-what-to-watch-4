import React from 'react';
import renderer from 'react-test-renderer';
import ShowMoreButton from './show-more-btn';

const handleButtonClick = jest.fn();

it(`ShowMoreBtn rendered correctly`, () => {
  const tree = renderer.create(<ShowMoreButton onShowMoreClick={handleButtonClick} />).toJSON();
  expect(tree).toMatchSnapshot();
});
