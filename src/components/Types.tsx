export interface PokemonData {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
  }
  export interface PokemonCard {
    id: number;
    name: string;
    base_exp: number;
    height: number;
    weight: number;
    types: {
      type: {
        name: string;
      };
    }[];
    abilities: {
        ability: {
            name: string;
        };
    }[];
    stats: {
      "stat": {
        name: string;
      }
        base_stat: number;
    }[];
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
}