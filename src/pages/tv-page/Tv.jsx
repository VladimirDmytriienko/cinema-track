import { useEffect, useState } from 'react';
import axios from "axios";
import MovieCard from '../../components/movie-card/MovieCard';
import useFavorites from '../../custom-hook/useFavorites';

// import './movies-styles.css';
import '../movies-page/movies-styles.css'

const Tv = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const { favorites, toggleFavorite } = useFavorites();
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchTvShows = async () => {
    try {
      const response = await axios.get(`${API_URL}/discover/tv`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          page: page,
          language: "en-US"
        }
      });
      const { data: { results } } = response;
      return results;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const loadMoreTvShows = async () => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    const newTvShows = await fetchTvShows();
    if (newTvShows.length > 0) {
      setTvShows((prevTvShows) => [...prevTvShows, ...newTvShows]);
    }
  };

  useEffect(() => {
    loadMoreTvShows();
  }, [page, isFirstLoad]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderTvShows = () => (
    tvShows.map(tvShow => {
      const updatedTvShow = {
        ...tvShow,
        media_type: "tv"
      };

      return (
        <div className='tv-show-item' key={updatedTvShow.id}>
          <MovieCard
            key={updatedTvShow.id}
            movie={updatedTvShow}
            isFavorite={favorites.some(fav => fav.id === updatedTvShow.id)}
            toggleFavorite={toggleFavorite}
          />
        </div>
      );
    })
  );

  return (
    <div className='movies'>
      <div className="wrapper-movies">
        {renderTvShows()}
      </div>
      <div className="load-more" onClick={loadMore}>
        Load More TV Shows
      </div>
    </div>
  );
};

export default Tv;
