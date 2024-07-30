import { useParams } from "react-router-dom";
import type { Pokemon } from "./Types";
// biome-ignore lint/suspicious/noRedeclare: <explanation>
import {  typeColors } from "./Types";
import { useEffect, useState } from "react";
import axios from "axios";

function PokemonView() {

    const [pokemon, setPokemon] = useState<Pokemon>()
    const [color, setColor] = useState('#ffffff')
    const { name } = useParams()
    useEffect(() => {
        async function fetchPokemon() {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const pokemonType = data.types[0].type.name;
            const bgColor = typeColors[pokemonType];
            setColor(bgColor);
            setPokemon(data)
        }
        fetchPokemon()
    }, [name])

    if (!pokemon) return null;

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      };
    return (
        <>
        <div className="px-64 pt-24 bg-slate-200 h-screen">
        <button type="button" className="text-red-500 font-bold" > Go Back</button>
            <div className="flex">
                <div className="rounded-l-lg" style={{ backgroundColor: color }}>
                    <div className="px-8">
                        <p className="text-white">#{pokemon.id}</p>
                        <h1 className="text-white text-4xl">{pokemon.name}</h1>
                    </div>
                    <img className=" w-80 h-80" src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
                </div>
                <div className="pt-8 px-24 bg-white rounded-r-lg">
                    <div>
                        <button type="button" onClick={() => scrollToSection('section1')}>Biography</button>
                        <button type="button" onClick={() => scrollToSection('section2')}>Stats</button>
                        <section id="section2">
                        <h3 className="font-bold">Base Stats</h3>
                        <ul className="flex flex-col justify-between">
                            {pokemon.stats.map((stat, index) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                                <li key={index}>{stat["stat"].name}: {stat.base_stat}</li>
                            ))}
                        </ul>
                        </section>
                    </div>
                    <section id="section1">
                    <ul>
                            <li>{pokemon.base_exp}</li>
                            <li>Height: {pokemon.height / 10} m</li>
                            <li>Weight: {pokemon.weight / 10} kg</li>
                            <li>Abilities:</li>
                            {pokemon.abilities.map((ability, index) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                <li key={index}> {ability.ability.name}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div >
        </div>
        </>

    )
}

export default PokemonView