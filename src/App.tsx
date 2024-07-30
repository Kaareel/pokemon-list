import List from "./components/List";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pokemon from "./components/PokemonView";


function App() {



  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<List />} />*/}
        <Route path="/pokemon/:name" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
