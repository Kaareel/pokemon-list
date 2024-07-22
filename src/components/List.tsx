// biome-ignore lint/style/useImportType: <explanation>
import { PokemonData } from "./Types";
import { Link } from "react-router-dom";

interface Props {
    list: PokemonData[];
}

function List(props: Props) {
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
                        {props.list.map((pokemon, index) => (
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