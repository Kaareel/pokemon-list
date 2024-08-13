import type { Pokemon } from "./Types";

interface Props {
    pokemon: Pokemon
}

function BiographyComponent(props: Props) {

    return (
        <div>
            <ul>
                <li>{props.pokemon.base_exp}</li>
                <li className="flex justify-between"><p>Height:</p> <p>{props.pokemon.height / 10} m</p></li>
                <li className="flex justify-between"><p>Weight:</p> <p>{props.pokemon.weight / 10} kg</p></li>
            </ul>
            <ul>
                <li className="flex gap-4">
                    <p>Abilities:</p>
                    <ul className="">
                        {props.pokemon.abilities.map((ability, index) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default BiographyComponent;