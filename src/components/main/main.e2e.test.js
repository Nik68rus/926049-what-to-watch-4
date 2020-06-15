import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockMovie = {
  title: `Test`,
  genre: `Test`,
  date: `Test`
};

describe(`Main component`, () => {
  it(`Title should be pressed`, () => {
    const titleClickHandler = jest.fn();
    const mainScreen = shallow(
        <Main
          mainMovie={mockMovie}
          movieList={[`Test1`, `Test2`, `Test3`]}
          onTitleClick={titleClickHandler}
        />
    );

    const movieTitle = mainScreen.find(`.small-movie-card__link`).first();
    movieTitle.simulate(`click`);
    expect(titleClickHandler).toHaveBeenCalledTimes(1);
  });
}
);
