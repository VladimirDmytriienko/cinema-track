import { useState } from "react";
import axios from "axios";
const SearchBar = ({ onSearch }) => {
  const API_URL = "https://api.themoviedb.org/3";
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/search/multi`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          query: query,
        },
      });
      const { data } = response;
      onSearch(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar