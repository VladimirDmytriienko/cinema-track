
import './App.css';
import { ErrorPage } from './ErrorPage';
import Favorites from './Favorites';
import { Layout } from './layout/Layout';
import Main from './Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './home/Home';
import Movie from './Movie';
import SearchPage from './search-page/SearchPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    // loader: maindLoader,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home/>
        // loader: dashboardLoader,
        // action: dashboardAction,
        // errorElement: <Error/>
      },
      { 
        path: "/movies",
        element: <Main/>,
      },
      { 
        path: "/favorites",
        element: <Favorites/>
      },
      { 
        path: "/search",
        element: <SearchPage/>
      },
      {
        path: "/:movieId",
        element: <Movie />,
      }

    ]
  },
  // {
  //   path: "*",
  //   element: <Error/>
  // },
]);

const App = () => {

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
};

export default App;
