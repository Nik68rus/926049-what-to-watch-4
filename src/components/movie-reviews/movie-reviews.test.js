import React from 'react';
import renderer from 'react-test-renderer';
import MovieReviews from './movie-reviews';

const comments = [
  {
    id: 1,
    user: {
      id: 6,
      name: `Ivan Ivanov`,
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: Date.now(),
  },
  {
    id: 2,
    user: {
      id: 5,
      name: `Bill Smith`,
    },
    rating: 8.0,
    comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    date: Date.now(),
  },
  {
    id: 3,
    user: {
      id: 4,
      name: `Bill Smith`,
    },
    rating: 8.0,
    comment: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
    date: Date.now(),
  },
  {
    id: 4,
    user: {
      id: 3,
      name: `Madonna`,
    },
    rating: 7.2,
    comment: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    date: Date.now(),
  },
  {
    id: 5,
    user: {
      id: 2,
      name: `Casper`,
    },
    rating: 6.0,
    comment: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    date: Date.now(),
  },
  {
    id: 6,
    user: {
      id: 1,
      name: `Sam`,
    },
    rating: 8.3,
    comment: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    date: Date.now(),
  },
];

it(`MovieReviews renders correctly`, () => {
  const tree = renderer.create(<MovieReviews comments={comments} />).toJSON();
  expect(tree).toMatchSnapshot();
});

