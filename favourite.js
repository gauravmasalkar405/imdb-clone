// Retrieve the array of favorite movies from local storage
const favouriteMovies =
  JSON.parse(localStorage.getItem("favouriteMovies")) || [];

const favouriteMoviesList = document.querySelector(".favourite-movies");

//mapping each movie
favouriteMovies.map((movie, index) => {
  const title = document.createElement("p");
  title.textContent = `${movie.Title}`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  const container = document.createElement("div");

  container.appendChild(title);
  container.appendChild(deleteButton);
  favouriteMoviesList.appendChild(container);

  // on delete using splice method that particular movie wiil be removed and movies will be updated in localstorage
  deleteButton.addEventListener("click", () => {
    favouriteMovies.splice(index, 1);
    localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
    favouriteMoviesList.removeChild(container);
  });
});
