
const MovieCard = ({ movie}) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";


  return (
    <div className="movie-card">
      <img className="movie-card__img" src={`${IMAGE_PATH}${movie.poster_path}`} alt="poster" />
      <h5>{movie.title}</h5>
      <p>&#9734; {movie.vote_average}</p>
    </div>
  );
};

export default MovieCard;
