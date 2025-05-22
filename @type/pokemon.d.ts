export interface Pokemon {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    type: string[];
}

export type PokemonFull = Pokemon & {
    stats: { name: string; value: number }[];
    moves: MoveDetailsType[];
    evolutions: string[];
};


export interface PokemonListItem {
    id: number;
    name: string;
    url: string;
    types?: string[];
}

export interface PokedexContextType {
    pokemon: Pokemon | null;
    setPokemon: (p: Pokemon | null) => void;
    pokemonList: PokemonListItem[];
    setPokemonList: (p: PokemonListItem[]) => void;
    updatePokemonTypes: (name: string, types: string[]) => void;
    getPokemonTypes: (name: string) => string[] | undefined;
}