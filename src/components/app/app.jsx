import React from 'react';
import Main from '../main/main.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {movie, genre, release} = props;
  return <Main movieTitle={movie} movieGenre={genre} movieRelease={release}/>;
};

export default App;
