import { useState, useEffect } from 'react';
import axios from 'axios';

const useMovie = (movieId) => {
  const [movie, setMovie] = useState(movieId);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: process.env.REACT_APP_MOVIE_API_KEY,
          },
        });

        const movieData = response.data;
        setMovie(movieData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return { movie, isLoading };
};

export default useMovie;
