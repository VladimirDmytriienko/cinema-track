import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMovie from "../custom-hook/useMovie";
import "../movie-page/movieInfo.css";
import YouTube from "react-youtube";
import Modal from "@mui/material/Modal";
import fetchMovieTrailer from "../functions/fetchMovieTrailer";
import ReactPlayer from 'react-player'

const MovieInfo = () => {
  const { movieId } = useParams();

  const { movie } = useMovie(movieId);
  const [videoKey, setVideoKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchMovieVideos = async () => {
      try {
        const trailerVideoKey = await fetchMovieTrailer(movie.id);

        setVideoKey(trailerVideoKey);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieVideos();
  }, [movie]);

  const backdropStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
    backgroundPosition: "0 0",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    minHeight: "100vh",
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
            className="movie-info__img"
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
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

          <button variant="outlined" onClick={handleOpenModal} className="modal-btn">
            Watch Trailer
          </button>
          <Modal open={isOpen} onClose={handleCloseModal} className="modal">
            <div className="modal-wrp">
              {/* <YouTube videoId={videoKey} opts={opts} onEnd={handleCloseModal} /> */}

              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoKey}`}
                controls={true}
                playing={true}
              />

              <button variant="outlined" onClick={handleCloseModal} className="modal-btn modal-btn__close">
                &#10005;
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;

