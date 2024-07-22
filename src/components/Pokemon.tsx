// biome-ignore lint/style/useImportType: <explanation>
import { PokemonCard } from "./Types";

interface Props {
    pokemons: PokemonCard[];
}
function Pokemon(props: Props) {
    
    return (
        <div>
            <div>
                <p>#{props.pokemons[0].id}</p>
                <h1>{props.pokemons[0].name}</h1>
                <img src={props.pokemons[0].sprites.other["official-artwork"].front_default} alt={props.pokemons[0].name} />
            </div>
            <div>
                <div>
                    <h2>Stats</h2>
                    <h3>Base Stats</h3>
                    <ul>
                        {props.pokemons[0].stats.map((stat, index) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                            <li key={index}>{stat["stat"].name}: {stat.base_stat}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Biography</h3>
                    <ul>
                        <li>{props.pokemons[0].base_exp}</li>
                        <li>Height: {props.pokemons[0].height / 10} m</li>
                        <li>Weight: {props.pokemons[0].weight / 10} kg</li>
                        <li>Abilities:</li>
                        {props.pokemons[0].abilities.map((ability, index) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            <li key={index}> {ability.ability.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Pokemon