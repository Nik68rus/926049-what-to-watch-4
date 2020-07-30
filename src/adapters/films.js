export const createMovie = (data) => {
  return {
    id: data.id,
    src: data.preview_video_link,
    preview: data.preview_image,
    title: data.name,
    poster: data.poster_image,
    background: data.background_image,
    backgroundColor: data.background_color,
    genre: data.genre,
    date: data.released,
    rating: data.rating,
    rateCount: data.scores_count,
    description: data.description,
    director: data.director,
    actors: data.starring,
    runTime: data.run_time,
    isFavorite: data.is_favorite,
  };
};
