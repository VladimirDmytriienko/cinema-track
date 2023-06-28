import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import useFavorites from "../custom-hook/useFavorites";
import SearchBar from "../SearchBar";




const SearchPage = () => {
  const [type, setType] = useState("movie");
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("80");
  const [movies, setMovies] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list`,
          {
            params: {
              api_key: process.env.REACT_APP_MOVIE_API_KEY,
            },
          }
        );

        const genreList = response.data.genres;
        setGenreList(genreList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenreList();
  }, [type]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/${type}`,
          {
            params: {
              api_key: process.env.REACT_APP_MOVIE_API_KEY,
              with_genres: selectedGenre,
            },
          }
        );

        const movies = response.data.results;
        setMovies(movies);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedGenre) {
      fetchMovies();
    }
  }, [type, selectedGenre]);

  const renderMovies = () =>
    movies.map((movie) => {
      const updatedMovie = {
        ...movie,
        media_type: type,
      };

      return (
        <MovieCard
          key={updatedMovie.id}
          movie={updatedMovie}
          isFavorite={favorites.some((fav) => fav.id === updatedMovie.id)}
          toggleFavorite={toggleFavorite}
        />
      );
    });

  return (
    <>  
      <SearchBar/>

      <aside>
        <div>SearchPage</div>
        <label>
          Pick a type
          <select name="type" onChange={(e) => setType(e.target.value)}>
           
            <option key="01" value="movie">
              movie
            </option>
            <option key="02" value="tv">
              tv
            </option>
          </select>
        </label>
        <label>
          Pick a genre
          <select
            name="genreList"
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
           
            {genreList.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
        <p>Your chosen genre: {selectedGenre}</p>
      </aside>
      <div className="wrapper">
        <h2>Movie Results:</h2>

        {renderMovies()}
      </div>

            
    </>
  );
};

export default SearchPage;
