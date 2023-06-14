import { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
    }, []);
  
    const toggleFavorite = (movie) => {
      const updatedFavorites = favorites.some((fav) => fav.id === movie.id)
        ? favorites.filter((fav) => fav.id !== movie.id)
        : [...favorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const renderFavorites = () => {
        if (favorites.length > 0) {
          return favorites.map((movie) => (
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
        Favorites
        {renderFavorites()}
      </div>
    );
  };
  
  export default Favorites;