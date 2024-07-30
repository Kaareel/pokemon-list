import { useParams } from "react-router-dom";
import type { Pokemon } from "./Types";
import { useEffect, useState } from "react";
import axios from "axios";

function BiographyComponent() {
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
            <ul>
                <li>{pokemon.base_exp}</li>
                <li className="flex justify-between"><p>Height:</p> <p>{pokemon.height / 10} m</p></li>
                <li className="flex justify-between"><p>Weight:</p> <p>{pokemon.weight / 10} kg</p></li>
            </ul>
            <div className="flex ">
                <p>Abilities:</p>
                <p >{pokemon.abilities.map((ability, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <p key={index}> {ability.ability.name}</p>
                    ))}</p>
            
                    
            </div>
        </div>
    )
}

export default BiographyComponent;