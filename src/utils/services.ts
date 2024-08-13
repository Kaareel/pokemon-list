import axios from "axios";
export interface PokemonResult {
    name: string;
    url: string;
}
interface Data {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResult[];
}
export interface InfoPokemon {
    name: string;
    types: {
        type: {
          name: string;
        };
      }[];
      height: string;
      weight: string;
}
export async function getAllPokemon(url = 'https://pokeapi.co/api/v2/pokemon?limit=10') {	

    const response = await axios.get<Data>(url);
    return response.data;
   
}

export async function getPokemonByName(name = 'bulbasaur') {
    const response = await axios.get<InfoPokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
}