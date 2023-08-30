import { useParams } from "react-router-dom";
import { useState } from "react";
import useMovie from "../../custom-hook/useMovie";
import "./movieInfo.css";
import Modal from "@mui/material/Modal";
import fetchMovieTrailer from "../../functions/fetchMovieTrailer";
import ReactPlayer from 'react-player'

const MovieInfo = () => {
  const { movieId } = useParams();
  const { movie } = useMovie(movieId);
  const [videoKey, setVideoKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = async () => {
    setIsOpen(true);
    try {
      const trailerVideoKey = await fetchMovieTrailer(movie.id);
      setVideoKey(trailerVideoKey);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const backdropStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
    backgroundPosition: "0 0",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    minHeight: "100vh",
  };

  const playerWidth = window.innerWidth < 850 ? "100vw" : "50vw";



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
          <p>Release Date: {movie.release_date}</p>

          <p>Vote: {movie.vote_average}</p>
          <p>{movie.overview}</p>

          <button variant="outlined" onClick={handleOpenModal} className="modal-btn">
            Watch Trailer
          </button>
          <Modal open={isOpen} onClose={handleCloseModal} className="modal">
            <div className="modal-wrp">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoKey}`}
                controls={true}
                playing={true}
                width={playerWidth}
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

