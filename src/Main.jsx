import { useEffect, useState } from 'react';
import axios from "axios";
import MovieCard from './components/MovieCard';
import useFavorites from './custom-hook/useFavorites';

const Main = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const { favorites, toggleFavorite } = useFavorites();
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/discover/movie`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
        }
      });
      const { data: { results } } = response;
      setMovies(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

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

  return (<>
    
    <div className="wrapper">
      {renderMovies()}

   
    </div>
  </>
  );
};

export default Main;