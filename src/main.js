import {
  getMoviesByQuery,
  getTrendingMovies,
  getMovieDetails,
  getTrailerMovie,
} from "./js/themoviedb-api";
import { createGallery } from "./js/render-functions";
import { resetGalleryScroll } from "./js/slider";
import {
  loadMovieInfo,
  displayMovieDetails,
  updateWatchlistButton,
  updateTrailerButton,
} from "./js/ui-helpers";
import { saveToWatchlist, isMovieInWatchlist } from "./js/storage";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const addToWatchlist = document.querySelector(".add-to-watchlist");

let page = 1;
let query = "";
let currentSelectedMovie = null;

async function loadInitialMovies() {
  const movies = await getTrendingMovies(page);

  createGallery(movies.results, gallery);
  loadMovieInfo(
    movies.results[0].backdrop_path,
    movies.results[0].original_title,
    movies.results[0].overview,
    movies.results[0].release_date,
    movies.results[0].vote_average,
  );
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resetGalleryScroll();

  const formData = new FormData(e.currentTarget);
  query = formData.get("search-text").trim();

  e.currentTarget.reset();

  try {
    gallery.innerHTML = "";
    const data = await getMoviesByQuery(query, page);

    createGallery(data.results, gallery);
  } catch (error) {
    console.log(error);
  }
});

gallery.addEventListener("mouseover", (e) => {
  addToWatchlist.style.display = "none";
  const el = e.target.closest(".gallery-item");
  if (!el) return;

  loadMovieInfo(
    el.dataset.backdrop,
    el.dataset.title,
    el.dataset.overview,
    el.dataset.release,
    el.dataset.vote,
  );
});

gallery.addEventListener("click", async (e) => {
  e.preventDefault();
  const el = e.target.closest(".gallery-item");
  if (!el) return;

  try {
    const movieId = el.dataset.id;
    const movieDetails = await getMovieDetails(movieId);
    currentSelectedMovie = movieDetails;

    displayMovieDetails(movieDetails);
    addToWatchlist.style.display = "flex";
    updateWatchlistButton(addToWatchlist, isMovieInWatchlist(movieDetails.id));

    const videoData = await getTrailerMovie(movieId);
    const trailer = videoData.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );
    updateTrailerButton(trailer);
  } catch (error) {
    console.log("Ошибка загрузки данных фильма:", error);
  }
});

addToWatchlist.addEventListener("click", () => {
  saveToWatchlist(currentSelectedMovie);
  updateWatchlistButton(addToWatchlist, true);
});

loadInitialMovies();
