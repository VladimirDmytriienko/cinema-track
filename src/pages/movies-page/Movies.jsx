import { useEffect, useState } from 'react';
import axios from "axios";
import MovieCard from '../../components/movie-card/MovieCard';
import useFavorites from '../../custom-hook/useFavorites';
import './movies-styles.css'
const Movies = () => {
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
    movies.map(movie => {
      const updatedMovie = {
        ...movie,
        media_type: "movie"
      };

      return (
        <div className='movie-item'>
          <MovieCard
          key={updatedMovie.id}
          movie={updatedMovie}
          isFavorite={favorites.some(fav => fav.id === updatedMovie.id)}
          toggleFavorite={toggleFavorite}
          />
        </div>

      );
    })
  );

  return (<div className='movies'>

  <div className="wrapper-movies">

    {renderMovies()}


  </div>
</div>
  );
};

export default Movies;