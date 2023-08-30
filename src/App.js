import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './home/Home';
import Movies from './pages/movies-page/Movies';
// import router from './routes/router'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      // loader: maindLoader,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
          // loader: dashboardLoader,
          // action: dashboardAction,
  
        },
        {
          path: 'movies',
          element: <Movies />,
        },
        // {
        //   path: 'tv',
        //   element: <Tv />,
        // },
        // // {
        // //   path: '/favorites',
        // //   element: <Favorites />,
        // // },
        // {
        //   path: 'search',
        //   element: <SearchPage />,
        // },
        // {
        //   path: 'login',
        //   element: <Login />,
        // },
        // {
        //   path: 'signup',
        //   element: <SignUp />,
        // },
        // {
        //   path: 'account',
        //   element: <ProtectedRoute> <Account/> </ProtectedRoute> ,
        // },
        // {
        //   path: ':movieId',
        //   element: <Movie />,
        //   errorElement: <ErrorPage />,
        // }
      ]
    },
  
  ]);

  return (
    <div className="App">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>

    </div>
  );
};

export default App;
