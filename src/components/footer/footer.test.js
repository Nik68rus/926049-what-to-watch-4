import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './footer';
import {Router} from 'react-router-dom';
import history from '../../history';

it(`Footer rendered correctly`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <Footer />
      </Router>)
  .toJSON();
  expect(tree).toMatchSnapshot();
});