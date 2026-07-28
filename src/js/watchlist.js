import { getWatchlist } from "./storage";
import crossBtnIcon from "../assets/cross.png";

const watchlistContainer = document.querySelector(".watchlist-container");
const loadMoreBtn = document.querySelector(".load-more");
let items = getWatchlist();
let currentPage = 1;

function updateBackground() {
  if (items.length > 0 && items[0][3]) {
    const bgUrl = `url(https://image.tmdb.org/t/p/w1280${items[0][3]})`;
    document.body.style.setProperty("--bg-image", bgUrl);
  } else {
    document.body.style.setProperty("--bg-image", "none");
  }
}

function renderWatchlist() {
  if (items.length === 0) {
    watchlistContainer.innerHTML = `<p class="empty-watchlist">No movies in your WatchList</p>`;
    return;
  }

  const markup = items
    .slice(0, currentPage * 12)
    .map((item) => {
      const img = item[3]
        ? `https://image.tmdb.org/t/p/w300${item[3]}`
        : "https://payload.cargocollective.com/1/23/758880/13104445/NO-MOVIE-POSTERS-02-03-003_2000_c.jpg";

      return `
        <div class="movie-info">
          <button class="btn-delete" data-id="${item[0]}">
            <img src="${crossBtnIcon}" alt="delete icon" />
          </button>
          <img class="movie-poster" src="${img}" alt="${item[1]}" />
          <p class="movie-title">${item[1]} (${item[2]})</p>
        </div>
      `;
    })
    .join("");

  watchlistContainer.innerHTML = markup;

  if (items.length > currentPage * 12) {
    loadMoreBtn.style.display = "block";
  } else {
    loadMoreBtn.style.display = "none";
  }
}

renderWatchlist();
updateBackground();

watchlistContainer.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".btn-delete");
  if (!deleteBtn) return;

  const movieId = Number(deleteBtn.dataset.id);

  items = items.filter((item) => item[0] !== movieId);
  localStorage.setItem("watchlist", JSON.stringify(items));

  renderWatchlist();
  updateBackground();

  if (items.length === 0) {
    watchlistContainer.innerHTML = `<p class="empty-watchlist">No movies in your WatchList</p>`;
  }
});

loadMoreBtn.addEventListener("click", () => {
  currentPage++;
  renderWatchlist();
});
