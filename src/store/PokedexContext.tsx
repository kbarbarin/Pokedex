import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import {
  PokedexContextType,
  Pokemon,
  PokemonListItem,
} from '@/@type/pokemon';

const PokedexContext = createContext<PokedexContextType>(
  {} as PokedexContextType
);

export const usePokedex = () => useContext(PokedexContext);

export const PokedexProvider = ({ children }: { children: ReactNode }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [favoriteList, setFavoriteList] = useState<PokemonListItem[]>([]);

  const updatePokemonTypes = (name: string, types: string[]) => {
    setPokemonList((prev) =>
      prev.map((p) =>
        p.name === name ? { ...p, types } : p
      )
    );
  };

  const toggleFavorite = (pokemon: PokemonListItem) => {
    setFavoriteList((prev) => {
      const exists = prev.some(p => p.name === pokemon.name);
      if (exists) return prev.filter(p => p.name !== pokemon.name);
      return [...prev, pokemon];
    });
  };
  

  const getPokemonTypes = (name: string): string[] | undefined => {
    const pokemon = pokemonList.find(p => p.name === name);
    return pokemon?.types;
  };



  return (
    <PokedexContext.Provider
      value={{
        pokemon,
        setPokemon,
        pokemonList,
        setPokemonList,
        favoriteList,
        toggleFavorite,
        updatePokemonTypes,
        getPokemonTypes
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};
