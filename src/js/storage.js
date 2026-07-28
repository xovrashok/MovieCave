export function getWatchlist() {
  const array = JSON.parse(localStorage.getItem("watchlist"));
  if (array) {
    return array;
  } else {
    return [];
  }
}

export function saveToWatchlist(movie) {
  const release = movie.release_date ? movie.release_date.split("-")[0] : "N/A";

  const movieInfo = [movie.id, movie.title, release, movie.poster_path];

  const dataList = getWatchlist();

  dataList.push(movieInfo);

  localStorage.setItem("watchlist", JSON.stringify(dataList));
}

export function isMovieInWatchlist(movieId) {
  const savedMovies = getWatchlist();
  return savedMovies.some((movie) => movie[0] === movieId);
}
