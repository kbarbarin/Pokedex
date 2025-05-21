import axios from './axiosInstance';
import { PokemonListItem } from '@/@type/pokemon';

export interface PokeListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export const fetchPokemonList = async (
    limit = 2000,
): Promise<PokemonListItem[]> => {
    const res = await axios.get<PokeListResponse>(
        `pokemon?limit=${limit}`
    );
    return enrichWithSprite(res.data.results);
};

export const enrichWithSprite = (list: PokemonListItem[]) =>
  list.map((pokemon) => {
    const idString = pokemon.url.split('/').filter(Boolean).pop();
    const id = idString ? parseInt(idString, 10) : 0; // fallback si undefined

    return {
      id,
      name: pokemon.name,
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });


  export const fetchPokemonsByType = async (type: string) => {
    const res = await axios.get(`type/${type}`);
    const pokemons = res.data.pokemon.map((p: any) => p.pokemon);
    return enrichWithSprite(pokemons); // fonctionne si tu as enrichWithSprite
  };
  


export const fetchPokemonDetails = async (name: string) => {
    const res = await axios.get(`pokemon/${name}`);
    return res.data;
};
