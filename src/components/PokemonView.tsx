import { useNavigate, useParams } from "react-router-dom";
import type { Pokemon } from "./Types";
import { typeColors } from "./Types";
import { useEffect, useState } from "react";
import axios from "axios";
import StatsComponent from "./Statistics";
import BiographyComponent from "./Biography";

function PokemonView() {

    const [pokemon, setPokemon] = useState<Pokemon>()
    const [color, setColor] = useState('#ffffff')
    const [information, setInformation] = useState(false)
    const { name } = useParams()
    const navigate = useNavigate();
    
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

    const viewBiography = () => {
        setInformation(false);
        scrollToSection('biografiaSection')
    };

    const viewStats = () => {
        setInformation(true);
        scrollToSection('statsSection')
    };

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <div className="place-content-center px-64 pt-24 bg-slate-200 h-screen">
                <button type="button" className="text-red-500 font-bold " onClick={() => navigate("/")} > Go Back</button>
                <div className="flex">
                    <div className="rounded-l-lg" style={{ backgroundColor: color }}>
                        <div className="px-8">
                            <p className="text-white">#{pokemon.id}</p>
                            <h1 className="text-white text-4xl">{pokemon.name}</h1>
                        </div>
                        <img className=" w-80 h-80" src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
                    </div>
                    <div className="pt-8 px-24 bg-white rounded-r-lg">
                        <div className="flex gap-4">
                            <button type="button" onClick={viewBiography} className="pb-3 focus:font-bold focus:border-b-2 focus:border-red-300">Biography</button>
                            <button type="button" onClick={viewStats} className="pb-3 focus:font-bold focus:border-b-2 focus:border-red-300">Stats</button>
                        </div>
                        <section id="statsSection" style={{ display: information ? 'block' : 'none' }}>
                            <StatsComponent />
                        </section>
                        <section id="biografiaSection" style={{ display: information ? 'none' : 'block' }}>
                            <BiographyComponent />
                        </section>
                    </div>
                </div >
            </div>
        </>

    )
}

export default PokemonView