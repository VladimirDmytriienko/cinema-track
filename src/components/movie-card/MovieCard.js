import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./movieCard.css";
import StarHalfTwoToneIcon   from "@material-ui/icons/StarHalfTwoTone";
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';

const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342/";

  return (
    <div className="movie-card">
      <div className="movie-card_poster">
        <img
          className="movie-card__img"
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt="poster"
        />
      </div>
      <div className="info-favorites"
        onClick={() => {
          toggleFavorite(movie);
          toast(isFavorite ? "Removed from favorites" : "Added to favorites");
        }}
        
      >
        {isFavorite ?   <StarRoundedIcon fontSize="large"/> : <StarBorderRoundedIcon fontSize="large"/> }
      </div>
      <div className="card-info">
        {/* <p>{movie.id}</p> */}
        <h5>{movie.title || movie.name}</h5>
        <span >
          <p className="card-vote">
            {" "}
            <StarHalfTwoToneIcon className="vote_star" /> {movie.vote_average} /
            10
          </p>
          <Link to={`/cinema-track/${movie.media_type}${movie.id}`}>details</Link>
        </span>

      </div>


    </div>
  );
};

export default MovieCard;
