import './App.css';
import { MovieProvider } from './Components/MovieContext';
import Home from './Components/Overview';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
    <MovieProvider>
    <Home />
    </MovieProvider>

    </div>
  );
}

export default App;