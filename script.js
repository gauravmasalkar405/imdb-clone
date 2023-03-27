const movieSuggestions = document.querySelector(".movie-suggestions");
const searchInput = document.getElementById("search-input");
const movieInfo = document.querySelector(".movie-info");
const apiKey = "2bf5c8b7";

let favouriteMovies = [];

function addToFavourite(movie) {
  favouriteMovies.push(movie);

  // it will store movies to localstorage
  localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
}

const displayMovieSuggestions = () => {
  const searchQuery = searchInput.value;
  // Don't make a request if the search query is too short
  if (searchQuery.length < 3) {
    // clear suggestions if search querry is small
    movieSuggestions.innerHTML = "";
    return;
  }

  // api to fetch movies
  $.getJSON(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`,
    function (data) {
      const searchResults = data.Search;

      // Clear previous suggestions
      movieSuggestions.innerHTML = "";

      if (searchResults) {
        const suggestionsList = document.createElement("ul");

        for (let i = 0; i < searchResults.length; i++) {
          const movie = searchResults[i];
          const suggestionItem = document.createElement("li");
          suggestionItem.textContent = movie.Title;

          suggestionItem.addEventListener("click", () => {
            //once movie from suggestion is clicked remove all suggestions
            movieSuggestions.innerHTML = "";

            // to clear previous movie info
            movieInfo.innerHTML = "";

            const poster = document.createElement("div");
            poster.innerHTML = `<img src="${movie.Poster}" alt="movie-info" />`;

            const title = document.createElement("p");
            title.textContent = `Title : ${movie.Title}`;

            const type = document.createElement("p");
            type.textContent = `Type : ${movie.Type}`;

            const year = document.createElement("p");
            year.textContent = `Year : ${movie.Year}`;

            const favouriteButton = document.createElement("button");
            favouriteButton.innerText = "Add to favourite";

            movieInfo.appendChild(poster);
            movieInfo.appendChild(title);
            movieInfo.appendChild(type);
            movieInfo.appendChild(year);
            movieInfo.appendChild(favouriteButton);

            favouriteButton.addEventListener("click", () => {
              addToFavourite(movie);
            });
          });
          suggestionsList.appendChild(suggestionItem);
        }
        movieSuggestions.appendChild(suggestionsList);
      }
    }
  );

  if (localStorage.getItem("favouriteMovies")) {
    favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
  }
};

searchInput.addEventListener("input", displayMovieSuggestions);
