import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import movies from './mocks/films';

const init = () => {
  ReactDOM.render(
      <App movie={movies[0]} movies={movies.slice(1)}/>,
      document.querySelector(`#root`)
  );
};

init();
