import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import useFavorites from "../custom-hook/useFavorites";

const Home = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const [time, setTime] = useState("week");
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
    movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        isFavorite={favorites.some((fav) => fav.id === movie.id)}
        toggleFavorite={toggleFavorite}
      />
    ))
  );

  return (
    <>
      <button onClick={() => handleTimeChange("week")}>Week</button>
      <button onClick={() => handleTimeChange("day")}>Day</button>
      <div className="wrapper">
        {renderMovies()}
      </div>
    </>
  );
};

export default Home;
