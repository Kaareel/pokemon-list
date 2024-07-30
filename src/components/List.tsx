import { useEffect, useState } from "react";
import type { Pokemon } from "./Types";
import { Link } from "react-router-dom";
import axios from "axios";

interface PokemonResult {
    name: string;
    url: string;
}
interface Data {

    next: string;
    results: PokemonResult[];
}

function List() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        
        const fetchPokemons = async () => {
          try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=649');
            const {results} = response.data;
            setPokemons(results);

    
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
        <div className="flex flex-col">
            <div className="m-3 border flex justify-center">
                <table className="table-fixed">
                    <thead>
                        <tr className="grid grid-cols-4 text-center items-center">
                            <th>#</th>
                            <th>Icon</th>
                            <th>Name</th>
                            <th>types</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemons.map((pokemon, index) => (
                            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                            <tr className="grid grid-cols-4 text-center items-center">
                                <td>{pokemon.id}</td>
                                <td>
                                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                </td>
                                <td><Link to="/pokemon" >{pokemon.name}</Link>
                                </td>
                                <td>
                                    <ul>
                                        {pokemon.types.map((type, index) => (
                                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                            <li key={index} className="Fire">{type.type.name}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default List;