import { useParams } from "react-router-dom"
import useMovie from "./custom-hook/useMovie"

const MovieInfo = () => {
    const {movieId} = useParams()
    const {movie} = useMovie(movieId)

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <img
        className="movie-card__img"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="poster"
      />
      
    </div>
  )
}

export default MovieInfo