const heroTitle = document.querySelector(".hero-title");
const heroOverview = document.querySelector(".hero-overview");
const heroVote = document.querySelector(".hero-vote");
const heroDuration = document.querySelector(".hero-duration");
const genresContainer = document.querySelector(".genres-container");
const trailerBtn = document.querySelector(".trailer-btn");

export function loadMovieInfo(poster, title, overview, release, vote) {
  document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${
    poster
      ? `https://image.tmdb.org/t/p/w1280${poster}`
      : "https://payload.cargocollective.com/1/23/758880/13104445/NO-MOVIE-POSTERS-02-03-003_2000_c.jpg"
  })`;
  heroTitle.textContent = `${title} (${release})`;
  heroOverview.textContent = overview;
  heroVote.textContent = `IMDB: ${vote}`;

  genresContainer.innerHTML = "";
  heroDuration.textContent = "";
}

export function displayMovieDetails(details) {
  const hours = Math.floor(details.runtime / 60);
  const minutes = details.runtime % 60;
  heroDuration.textContent = `${hours}h ${minutes}min`;

  const genresMarkup = details.genres
    .map((genre) => `<span class="genre-badge">${genre.name}</span>`)
    .join("");

  genresContainer.innerHTML = genresMarkup;
}

export function updateWatchlistButton(btnElement, isAdded) {
  if (isAdded === true) {
    btnElement.innerHTML = `<img class="add-btn-icon" src="/src/assets/watchlist-added.svg" alt="added to watchlist icon" /> Watchlist added`;
    btnElement.disabled = true;
    btnElement.style.cursor = "not-allowed";
  } else {
    btnElement.innerHTML = `<img class="add-btn-icon" src="https://img.icons8.com/?size=100&id=24717&format=png&color=000000" alt="add to watchlist icon" /> Add to watchlist`;
    btnElement.disabled = false;
    btnElement.style.cursor = "pointer";
  }
}

export function updateTrailerButton(trailerKey) {
  if (trailerKey) {
    trailerBtn.style.opacity = "1";
    trailerBtn.onclick = () => {
      window.open(
        `https://www.youtube.com/watch?v=${trailerKey.key}`,
        "_blank",
      );
    };
  } else {
    trailerBtn.style.opacity = "0.3";
    trailerBtn.onclick = () => alert("Trailer not available for this movie");
  }
}
