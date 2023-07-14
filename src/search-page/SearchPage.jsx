import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/movie-card/MovieCard";
import useFavorites from "../custom-hook/useFavorites";
import './search-page.css'

const SearchPage = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const [type, setType] = useState("movie");
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("80");
  const [movies, setMovies] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/genre/${type}/list`,
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
          `${API_URL}/discover/${type}`,
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

    fetchMovies();
  }, [type, selectedGenre]);

  const handleInputChange = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    try {
      const response = await axios.get(`${API_URL}/search/multi`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          query: searchQuery,
        },
      });
      const { data } = response;
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search">
      <div>
        <h2>Movie Results:</h2>
        <div className="wrapper-movies">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={{
                ...movie,
                media_type: movie.media_type || type,
              }}
              isFavorite={favorites.some((fav) => fav.id === movie.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>

      <aside className="aside">
        <div className="aside-search">
          <div>
            <h2> Search</h2>
          </div>
          <input  
            type="text"
            className="aside__input"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
          />
        </div>
        <div className="aside-search">
          <label className="aside__label">
            <h4>Pick a type</h4>
            <select
              name="type"
              className="aside__select"
              onChange={(e) => setType(e.target.value)}
            >
              <option key="01" value="movie">
                movie
              </option>
              <option key="02" value="tv">
                tv
              </option>

            </select>
          </label>
          <label className="aside__label">
            <h4>Pick a genre</h4>
            <select
              name="genreList"
              className="aside__select"
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genreList.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </label>
        </div>

      </aside>

    </div>
  );
};

export default SearchPage;
