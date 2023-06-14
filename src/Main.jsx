import { useEffect, useState } from 'react';
import axios from "axios";
import MovieCard from './components/MovieCard';

const Main = () => {
    const API_URL = "https://api.themoviedb.org/3";
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
  
    const fetchMovies = async () => {
      const { data: { results } } = await axios.get(`${API_URL}/discover/movie`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY
        }
      });
      setMovies(results);
    };
  
    const fetchFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(favorites);
    };
  
    useEffect(() => {
      fetchMovies();
      fetchFavorites();
    }, []);
  
    const toggleFavorite = (movie) => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const index = favorites.findIndex((fav) => fav.id === movie.id);
  
      if (index !== -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(movie);
      }
  
      localStorage.setItem("favorites", JSON.stringify(favorites));
      fetchFavorites();
    };
  
    const renderMovies = () => (
      movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.some(fav => fav.id === movie.id)}
          toggleFavorite={toggleFavorite}
        />
      ))
    );
  return (
    <div className="wrapper">
        {renderMovies()}
    </div>
  )
}

export default Main