import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";
import useMovie from "../custom-hook/useMovie"
import '../movie-page/movieInfo.css'
import YouTube from 'react-youtube';

const MovieInfo = () => {
  const { movieId } = useParams()

  const { movie } = useMovie(movieId)
  console.log(movie.id);
  const [videoKey, setVideoKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchMovieVideos = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          {
            params: {
              api_key: process.env.REACT_APP_MOVIE_API_KEY,
            },
          }
        );

        const videos = response.data.results;
        console.log(videos);

        const trailerVideo = videos.find(vid => vid.name === "Official Trailer");

        console.log(trailerVideo);

        if (trailerVideo) {
          setVideoKey(trailerVideo.key);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieVideos();
  }, [movie]);

   


  const backdropStyle = {

    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
    backgroundPosition: '0 0',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    minHeight: '100vh',

  };



  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const opts = {
    height: "315",
    width: "560",
    playerVars: {
      autoplay: 1,
    },
  };
  return (

    <div className="movieInfo" style={backdropStyle}>
      <div className="shadow"></div>
      <div className="movieInfo-box">
        <div>
          <img
            className="movie-card__img"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="poster"
          />
        </div>
        <div className="movieInfo-text">
          <h1>{movie.original_title || movie.name}</h1>
          <h4>Tagline: {movie.tagline}</h4>
          <p>{movie.status}</p>


          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Vote: {movie.vote_average}</p>

          <button onClick={handleOpenModal}>Open</button>
          {isOpen && (
        <div>
          <YouTube videoId={videoKey} opts={opts} onEnd={handleCloseModal} />
        </div>
      )}
        </div>
      </div>
    </div>


  )
}

export default MovieInfo