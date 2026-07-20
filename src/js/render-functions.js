export function createGallery(movies, container) {
  const markup = movies
    .map((movie) => {
      const release = movie.release_date
        ? movie.release_date.split("-")[0]
        : "N/A";
      const img = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : "https://payload.cargocollective.com/1/23/758880/13104445/NO-MOVIE-POSTERS-02-03-003_2000_c.jpg";
      return `
    <li class="gallery-item" 
    data-backdrop="https://image.tmdb.org/t/p/w1280${movie.backdrop_path}"
    data-title="${movie.original_title}"
    data-overview="${movie.overview}"
    data-release="${release}"
    data-vote="${movie.vote_average}"
    data-id="${movie.id}"
    >
        <a class="gallery-link" data-backdrop="${movie.backdrop_path}" href="${movie.backdrop_path}">
          <img class="gallery-image" src="${img}" alt="${movie.original_title}" />
        </a>
    </li>
    `;
    })
    .join("");

  container.insertAdjacentHTML("beforeend", markup);
}
