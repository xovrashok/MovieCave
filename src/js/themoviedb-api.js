import axios from "axios";

export async function getMoviesByQuery(query, page) {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        query: query,
        page: page,
      },
    },
  );

  return response.data;
}

export async function getTrendingMovies(page) {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/week",
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        page: page,
      },
    },
  );

  return response.data;
}

export async function getMovieDetails(movieId) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    },
  );

  return response.data;
}

export async function getTrailerMovie(movieId) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/videos`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    },
  );

  return response.data;
}
