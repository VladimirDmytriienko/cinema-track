import './App.css';
import { ErrorPage } from './ErrorPage';
import Favorites from './Favorites';
import { Layout } from './Layout';
import Main from './Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './home/Home';

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
