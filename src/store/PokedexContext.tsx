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

  const updatePokemonTypes = (name: string, types: string[]) => {
    setPokemonList((prev) =>
      prev.map((p) =>
        p.name === name ? { ...p, types } : p
      )
    );
  };

  return (
    <PokedexContext.Provider
      value={{
        pokemon,
        setPokemon,
        pokemonList,
        setPokemonList,
        updatePokemonTypes,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};
