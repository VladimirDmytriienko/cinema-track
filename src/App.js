import './App.css';
import Favorites from './Favorites';
import Main from './Main';


const App = () => {
 
  return (
    <div className="App">
      <header>
        <h1>Cinema track</h1>
      </header>
      
      <Main/>
      <Favorites/>
      
    </div>
  );
};

export default App;
