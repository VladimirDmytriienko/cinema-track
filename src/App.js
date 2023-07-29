import './App.css';

// import Favorites from './Favorites';
import { Layout } from './layout/Layout';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './home/Home';
import Movie from './pages/Movie';
import SearchPage from './pages/search-page/SearchPage';
import { AuthContextProvider } from './context/AuthContext';
import Login from './pages/Login';
import SignUp from './pages/signUp/SignUp';
import Account from './pages/Account';

import Movies from './pages/movies-page/Movies';
import ProtectedRoute from './components/ProtectedRoute';
import { ErrorPage } from './pages/ErrorPage';



const router = createBrowserRouter([
  {
    path: "/cinema-track",
    element: <Layout/>,
    // loader: maindLoader,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home/>,
        // loader: dashboardLoader,
        // action: dashboardAction,
        // errorElement: <Error/>
        
      },
      { 
        path: "movies",
        element: <Movies/>
      },
      // { 
      //   path: "/favorites",
      //   element:  <Favorites/>
      // },
      { 
        path: "search",
        element: <SearchPage/>
      },
      { 
        path: "login",
        element: <Login/>
      },
      { 
        path: "signup",
        element: <SignUp/>
      },
      { 
        path: "account",
        element: <ProtectedRoute> <Account/> </ProtectedRoute> 
      },
      {
        path: ":movieId",
        element: <Movie />,
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage/>
  },
]);

const App = () => {

  return (
    <div className="App">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>

    </div>
  );
};

export default App;
