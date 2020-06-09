import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const promoMovie = {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    date: `2014`,
  };

  ReactDOM.render(
      <App movie={promoMovie.title} genre={promoMovie.genre} release={promoMovie.date}/>,
      document.querySelector(`#root`)
  );
};

init();
