import axios from "axios";
import { useEffect, useState } from "react";
import List from "./components/List";
// biome-ignore lint/style/useImportType: <explanation>
import { PokemonCard, PokemonData } from "./components/Types";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pokemon from "./components/Pokemon";


function App() {
  const [list, setList] = useState<PokemonData[]>([]);
  const [pokemons, setPokemons] = useState<PokemonCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=649');
        const results = response.data.results;

        const pokemonDataPromises = results.map(async (pokemon: { url: string }) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        });

        const allPokemonData = await Promise.all(pokemonDataPromises);
        setList(allPokemonData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemons) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<List list={list} />} />
        <Route path="/pokemon" element={<Pokemon pokemons={pokemons} />} />
      </Routes>
    </Router>
  );
}

export default App;
