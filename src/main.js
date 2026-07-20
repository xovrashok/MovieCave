import {
  getMoviesByQuery,
  getTrendingMovies,
  getMovieDetails,
  getTrailerMovie,
} from "./js/themoviedb-api";
import { createGallery } from "./js/render-functions";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const heroTitle = document.querySelector(".hero-title");
const heroOverview = document.querySelector(".hero-overview");
const heroVote = document.querySelector(".hero-vote");
const heroDuration = document.querySelector(".hero-duration");
const genresContainer = document.querySelector(".genres-container");
const trailerBtn = document.querySelector(".trailer-btn");
const previewBtn = document.querySelector(".preview-btn");
const nexBtn = document.querySelector(".next-btn");
const galleryMask = document.querySelector(".gallery-mask");

let page = 1;
let query = "";
let currentShift = 0;

function loadMovieInfo(poster, title, overview, release, vote) {
  document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${
    poster
      ? `https://image.tmdb.org/t/p/w1280${poster}`
      : "https://payload.cargocollective.com/1/23/758880/13104445/NO-MOVIE-POSTERS-02-03-003_2000_c.jpg"
  })`;
  heroTitle.textContent = `${title} (${release})`;
  heroOverview.textContent = overview;
  heroVote.textContent = `IMDB: ${vote}`;
}

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
  const el = e.target.closest(".gallery-item");
  if (!el) return;

  loadMovieInfo(
    el.dataset.backdrop,
    el.dataset.title,
    el.dataset.overview,
    el.dataset.release,
    el.dataset.vote,
  );

  genresContainer.innerHTML = "";
  heroDuration.textContent = "";
});

gallery.addEventListener("click", async (e) => {
  e.preventDefault();
  const el = e.target.closest(".gallery-item");
  if (!el) return;

  try {
    const movieDetails = await getMovieDetails(el.dataset.id);

    const hours = Math.floor(movieDetails.runtime / 60);
    const minutes = movieDetails.runtime % 60;
    heroDuration.textContent = `${hours}h ${minutes}min`;

    const genresMarkup = movieDetails.genres
      .map((genre) => `<span class="genre-badge">${genre.name}</span>`)
      .join("");

    genresContainer.innerHTML = genresMarkup;
  } catch (error) {
    console.log("Ошибка загрузки деталей:", error);
  }

  const videoData = await getTrailerMovie(el.dataset.id);

  const trailer = videoData.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  if (trailer) {
    trailerBtn.style.opacity = "1";
    trailerBtn.onclick = () => {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    };
  } else {
    trailerBtn.style.opacity = "0.3";
    trailerBtn.onclick = () => alert("Trailer not available for this movie");
  }
});

nexBtn.addEventListener("click", () => {
  const maxWidthGallery = gallery.scrollWidth;
  const galleryClientWidth = galleryMask.clientWidth;
  const maxShift = maxWidthGallery - galleryClientWidth;

  if (currentShift + 200 > maxShift) {
    return;
  } else {
    currentShift += 200;
    gallery.style.transform = `translateX(-${currentShift}px)`;
  }
});

previewBtn.addEventListener("click", () => {
  if (currentShift <= 0) {
    return;
  } else {
    currentShift -= 200;
    gallery.style.transform = `translateX(-${currentShift}px)`;
  }
});

function resetGalleryScroll() {
  currentShift = 0;
  gallery.style.transform = "translateX(0px)";
}

loadInitialMovies();
