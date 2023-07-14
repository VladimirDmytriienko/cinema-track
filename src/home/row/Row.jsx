import axios from "axios";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import './row.css'
import MovieCard from "../../components/movie-card/MovieCard";
import useFavorites from "../../custom-hook/useFavorites";

const Row = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(url);
        const { data: { results } } = response;

        const updatedMovies = results.map((movie) => ({
          ...movie,
          media_type: "movie",
        }));

        setMovies(updatedMovies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [url]);

  const renderMovies = () => (
    <Swiper     spaceBetween={30}
    slidesPerView={6}
    breakpoints={{
      0: {
        slidesPerView: 2,
      },
      450: {
        slidesPerView: 2,
      },
      865:{
        slidesPerView:3
      }
    }}  loop={true}>
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MovieCard
            movie={movie}
            isFavorite={favorites.some((fav) => fav.id === movie.id)}
            toggleFavorite={toggleFavorite}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <div className="row">
      <h2>{title}</h2>
      {renderMovies()}
    </div>
  );
};

export default Row;
