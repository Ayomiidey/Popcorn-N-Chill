import { useState } from "react";

import Box from "./components/Box";
import Loader from "./components/Loader";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar";
import NumResult from "./components/NumResult";
import Search from "./components/Search";
import WatchedMovieList from "./components/WatchedMovieList";
import WatchedSummary from "./components/WatchedSummary";
import ErrorMessage from "./components/ErrorMessage";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

// const KEY = "f47a8af6";

export default function App() {
  const [query, setQuery] = useState("interstellar");

  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const { movies, isLoading, error } = useMovies(query);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
