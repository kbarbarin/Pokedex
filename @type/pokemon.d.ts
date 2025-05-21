export interface Pokemon {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    type: string[];
}

export interface PokemonListItem {
    id: number;
    name: string;
    url: string;
}

export interface PokedexContextType {
    pokemon: Pokemon | null;
    setPokemon: (p: Pokemon | null) => void;
    pokemonList: PokemonListItem[];
    setPokemonList: (p: PokemonListItem[]) => void;
    addPokemon: (p: PokemonListItem) => void;
  }
  