import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pokemon from "./components/PokemonView";
import View from "./components/View";


function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<View />}/>
        <Route path="/pokemon/:name" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
