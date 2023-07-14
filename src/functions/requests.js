const key = process.env.REACT_APP_MOVIE_API_KEY;
const currentDate = new Date();
const startDate = currentDate.toISOString().split("T")[0]; // Текущая дата

const endDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]; 

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&language=en-US`,
};

export default requests;
