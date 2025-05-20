export interface Pokemon {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    type: string[];
}

export type PokedexContextType = {
    pokemons: Pokemon[];
    addPokemon: (pokemon: Pokemon) => void;
}