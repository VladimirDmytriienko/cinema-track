import { Link } from "react-router-dom";

const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-card">
      <img
        className="movie-card__img"
        src={`${IMAGE_PATH}${movie.poster_path}`}
        alt="poster"
      />
      <h5>{movie.title || movie.name}</h5>
      <p>&#9734; {movie.vote_average}</p>
      <button onClick={() => toggleFavorite(movie)}>
        {isFavorite ? "★" :  "☆"}
      </button>
      <Link to={`/${movie.id}`}>details</Link>
    </div>
  );
};

export default MovieCard;
