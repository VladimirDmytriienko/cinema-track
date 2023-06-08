import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import MovieCard from './components/MovieCard';
function App() {
  const API_URL ="https://api.themoviedb.org/3"
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    const {data: {results}} = await axios.get(`${API_URL}/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY
      }
    })
    setMovies(results)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const renderMovies = () => (
    movies.map(movie => (
      
      <MovieCard
        key={movie.id}
        movie={movie}
      />
      
    ))
  )

  return (
    <div className="App">
      <header>
        <h1>Cinema track</h1>
      </header>
      <div className="wrapper">
        {renderMovies()}
      </div>
    </div>
  );
}

export default App;
