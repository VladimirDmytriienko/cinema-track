import axios from "axios";

const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await axios.get(
      `http://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
        },
      }
    );
    const videos = response.data.results;
    const trailerVideo = videos.find((vid) => vid.name === "Official Trailer" ) || videos.find((vid) => vid.name === "Teaser Trailer" ) || videos[0];

    if (trailerVideo) {
      return trailerVideo.key;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchMovieTrailer;
