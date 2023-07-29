import { useEffect, useState } from 'react';
import axios from "axios";
import MovieCard from '../../components/movie-card/MovieCard';
import useFavorites from '../../custom-hook/useFavorites';
import './movies-styles.css';

const Movies = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const { favorites, toggleFavorite } = useFavorites();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/discover/movie`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          page: page
        }
      });
      const { data: { results } } = response;
      return results;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const loadMoreMovies = async () => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    const newMovies = await fetchMovies();
    if (newMovies.length > 0) {
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    }
  };

  useEffect(() => {
    loadMoreMovies();
  }, [page, isFirstLoad]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderMovies = () => (
    movies.map(movie => {
      const updatedMovie = {
        ...movie,
        media_type: "movie"
      };

      return (
        <div className='movie-item' key={updatedMovie.id}>
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

  return (
    <div className='movies'>
      <div className="wrapper-movies">
        {renderMovies()}
      </div>
      <div className="load-more" onClick={loadMore}>
        Load More
      </div>
    </div>
  );
};

export default Movies;
