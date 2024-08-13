import type { Pokemon } from "./Types";


interface Props {
    pokemon: Pokemon
}

function StatsComponent(props: Props) {
    return (
        <div>
            <h3 className="font-bold">Base Stats</h3>
            <ul className="flex flex-col ">
                {props.pokemon.stats.map((stat, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                    <li className="flex justify-between gap-4" key={index}><p>{stat["stat"].name} :</p> <p>{stat.base_stat}</p></li>
                ))}
            </ul>
        </div>

    )
}

export default StatsComponent;