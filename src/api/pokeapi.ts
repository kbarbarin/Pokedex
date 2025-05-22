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
    const id = idString ? parseInt(idString, 10) : 0;

    return {
      id,
      name: pokemon.name,
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });

  export const enrichWithTypes = async (pokemon: PokemonListItem): Promise<PokemonListItem> => {
    try {
      const res = await axios.get(`pokemon/${pokemon.name}`);
      const types = res.data.types.map((t: any) => t.type.name);
  
      return {
        ...pokemon,
        types,
      };
    } catch (e) {
      console.warn(`Failed to fetch types for ${pokemon.name}`);
      return pokemon;
    }
  };  


  export const fetchPokemonsByType = async (type: string) => {
    const res = await axios.get(`type/${type}`);
    const pokemons = res.data.pokemon.map((p: any) => p.pokemon);
    return enrichWithSprite(pokemons);
  };
  


export const fetchPokemonDetails = async (name: string) => {
    const res = await axios.get(`pokemon/${name}`);
    return res.data;
};

export const fetchPokemonSpecies = async (idOrName: string | number) => {
  const res = await axios.get(`pokemon-species/${idOrName}`);
  return res.data;
};

export const fetchEvolutionChain = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

export const fetchMovesDetails = async (moveNames: string[]) => {
  try {
    const movesDetails = await Promise.all(
      moveNames.slice(0, 20).map(async (moveName) => { // limite à 20 moves pour éviter trop de requêtes
        const res = await axios.get(`move/${moveName}`);
        const flavorEntry = res.data.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        );

        return {
          name: moveName,
          power: res.data.power,
          accuracy: res.data.accuracy,
          type: res.data.type.name,
          pp: res.data.pp,
          description: flavorEntry ? flavorEntry.flavor_text.replace(/\n|\f/g, ' ') : '',
        };
      })
    );

    return movesDetails;
  } catch (error) {
    console.warn('Erreur lors de la récupération des détails des moves', error);
    return [];
  }
};