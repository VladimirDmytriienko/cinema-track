import { useEffect, useState } from 'react';
import MovieCard from '../components/movie-card/MovieCard';
import useFavorites from '../custom-hook/useFavorites';


const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    setFavoriteMovies(favorites);
  }, [favorites]);

  const renderFavorites = () => {
    if (favoriteMovies.length > 0) {
      return favoriteMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={true}
          toggleFavorite={toggleFavorite}
        />
      ));
    } else {
      return <p>No favorites found.</p>;
    }
  };

  return (
    <div>
      <div className='movies'>
      <h2 className='favorites-heading'>Your favorites:</h2>
        <div className="wrapper-movies">

          {renderFavorites()}

        </div>
      </div>

    </div>
  );
};

export default Favorites;