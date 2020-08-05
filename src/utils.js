export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getMovieIndex = (movies, id) => movies.map((item) => item.id).indexOf(id);
