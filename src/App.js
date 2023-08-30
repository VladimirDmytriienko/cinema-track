import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';

import router from './routes/router'

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
