import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/movie-card/MovieCard";
import useFavorites from "../custom-hook/useFavorites";

import { Swiper, SwiperSlide } from 'swiper/react';
import Toggle from "./toggle/Toggle";
import requests from "../functions/requests";
import Row from "./row/Row";
import SwiperComponent from "../components/SwiperComponent";
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
const Home = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const [time, setTime] = useState("day");
  const [movies, setMovies] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();

  const fetchPopularMovies = async (time) => {
    try {
      const response = await axios.get(`${API_URL}/trending/all/${time}`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
        },
      });

      const { data: { results } } = response;
      setMovies(results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTimeChange = (time) => {
    setTime(time);
    fetchPopularMovies(time); 
  };

  useEffect(() => {
    fetchPopularMovies(time);
  }, [time]); 
  
  const renderMovies = () => (
    <Swiper className="trending"  slidesPerView={6}     breakpoints={{
      0: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
      },
      1000:{
        slidesPerView:4
      }
    }}  spaceBetween={30} loop={true} >
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
    <>
      <SwiperComponent   movies={movies}/>
      
      <div className="wrapper">
        <div><Toggle handleTimeChange={handleTimeChange}/></div>
        

        {renderMovies()}
        <Row title="Upcoming" url={requests.requestUpcoming}></Row>
        <Row title="Top rated" url={requests.requestTopRated}></Row>
        <Row title="Popular" url={requests.requestPopular}></Row>
        <Row title="Horor" url={requests.requestHorror}></Row>
      </div>

      

    </>
  );
};

export default Home;
