import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import Modal from "@mui/material/Modal";
import YouTube from "react-youtube";
import fetchMovieTrailer from "./functions/fetchMovieTrailer";
import { Link } from "react-router-dom";

const SwiperComponent = ({ movies }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideoKey, setSelectedVideoKey] = useState("");

  const handleOpenModal = async (videoKey) => {
    try {
      const trailerKey = await fetchMovieTrailer(videoKey);
      setSelectedVideoKey(trailerKey);
      setIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setSelectedVideoKey("");
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
    <>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper banner-swiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="gradient"></div>
            <img
              className="movie-slider__img"
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt="poster"
            />
            <div className="banner-btn">
              <button className="play-button" onClick={() => handleOpenModal(movie.id)}>
                <p>Play</p>
              </button>
              <button className="play-button">
                <Link to={`/cinema-track/${movie.media_type}${movie.id}`}>Details</Link>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal open={isOpen} onClose={handleCloseModal} className="modal">
        <div className="modal-wrp">
          <YouTube videoId={selectedVideoKey} opts={opts} onEnd={handleCloseModal} />
          <button
            variant="outlined"
            onClick={handleCloseModal}
            className="modal-btn modal-btn__close"
          >
            &#10005;
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SwiperComponent;
