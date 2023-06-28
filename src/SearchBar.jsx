import { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    handleSearch(event.target.value);

  };

  const handleSearch = async (searchQuery) => {
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
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title || movie.name }  {movie.media_type}</li>
        ))}
      </ul>
    </div>
  );
};


export default SearchBar