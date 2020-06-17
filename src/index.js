import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import movies from './mocks/films';

const init = () => {
  const promoMovie = {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    date: `2014`,
  };

  ReactDOM.render(
      <App movie={promoMovie} movies={movies}/>,
      document.querySelector(`#root`)
  );
};

init();
