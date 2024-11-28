import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
