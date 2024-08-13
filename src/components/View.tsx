import { useEffect, useState } from "react";
import List from "./List";
import { getAllPokemon, getPokemonByName } from "../utils/services";
import type { PokemonResult } from "../utils/services";

interface InfoPokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
      type: {
        name: string;
      };
    }[];
}

function View() {
    const [pokemons, setPokemons] = useState<PokemonResult[]>([]);
    const [name, setName] = useState<InfoPokemon>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [nextURL, setNextURL] = useState<string | null>(null);
    const [previousURL, setPreviousURL] = useState<string | null>(null);

    const fetchPokemons = async (url?: string) => {
        try {
            const { results, next, previous } = await getAllPokemon(url);
            setPokemons(results);
            setNextURL(next);
            setPreviousURL(previous);
            setLoading(false);
        } catch (error) {
            setError('Error fetching data');
            setLoading(false);
        }
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        fetchPokemons();
    }, []);

    const goToNext = () => {
        if (nextURL) {
            fetchPokemons(nextURL);
        }
    };
    const goToPrevious = () => {
        if (previousURL) {
            fetchPokemons(previousURL);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!pokemons) {
        return <div>Loading...</div>;
    }

  /* const infoPokemon = async ( name: string) => {
        try {
            const results = await getPokemonByName(name);
            setName(results);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        }
    };*/

    return (
        <div>
            <List pokemons={pokemons} goToNext={goToNext} goToPrevious={goToPrevious} nextURL={nextURL} previousURL={previousURL}/>
        </div>
    )
}

export default View;