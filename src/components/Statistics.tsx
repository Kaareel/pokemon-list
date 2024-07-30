import { useParams } from "react-router-dom";
import type { Pokemon } from "./Types";
import { useEffect, useState } from "react";
import axios from "axios";

function StatsComponent() {
    const [pokemon, setPokemon] = useState<Pokemon>()
    const { name } = useParams()
    useEffect(() => {
        async function fetchPokemon() {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            setPokemon(data)
        }
        fetchPokemon()
    }, [name])

    if (!pokemon) return null;
    return (
        <div>
            <h3 className="font-bold">Base Stats</h3>
            <ul className="flex flex-col ">
                {pokemon.stats.map((stat, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                    <li className="flex justify-between gap-4" key={index}><p>{stat["stat"].name} :</p> <p>{stat.base_stat}</p></li>
                ))}
            </ul>
        </div>

    )
}

export default StatsComponent;