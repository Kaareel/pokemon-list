import { Link } from "react-router-dom";


interface PokemonResult {
    name: string;
    url: string;
}
interface Props {
    pokemons: PokemonResult[];
    goToNext: () => void;
    goToPrevious: () => void;
    previousURL: string | null;
    nextURL: string | null;
}

function List(props: Props) {

    return (
        <div className="flex flex-col items-center">
            <div className="m-3 w-auto h-auto border border-gray-300 flex flex-col justify-center items-center p-4">
                <div className="flex">
                </div>
                {props.pokemons.map((pokemon, index) => (
                    // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                    <Link to={`/pokemon/${pokemon.name}`} className="block mb-2">{pokemon.name}</Link>
                ))}
                <div className="flex gap-2">
                    {props.previousURL && (<button type="button" onClick={props.goToPrevious} className="bg-button text-white px-3 py-1 border-2 border-gray-900  rounded-md"> Previous </button>)}
                    {props.nextURL && (<button type="button" onClick={props.goToNext} className="bg-button text-white px-3 py-1 border-2 border-gray-900  rounded-md"> Next </button>)}
                </div>

            </div>
        </div>
    )
}

export default List;