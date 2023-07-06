import { Link } from "react-router-dom";

const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342/";

  return (
    <div className="movie-card">
      {/* {console.log(movie)} */}
      <div className="movie-car"> 
        <img
          className="movie-card__img"
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt="poster"
        />
    
      </div>

      <p>{movie.id}</p>
      <h5>{movie.title || movie.name}</h5>
      <p>&#9734; {movie.vote_average}</p>
      <button onClick={() => toggleFavorite(movie)}>
        {isFavorite ? "★" :  "☆"}
      </button>
      <Link to={`/${movie.media_type}${movie.id}`}>
          details
      </Link>
    </div>
  );
};

export default MovieCard;
