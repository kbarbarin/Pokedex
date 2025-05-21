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

  const addPokemon = (newPokemon: PokemonListItem) => {
    if (pokemonList.find(p => p.name === newPokemon.name)) return;
    setPokemonList(prev => [...prev, newPokemon]);
  };

  return (
    <PokedexContext.Provider
      value={{
        pokemon,
        setPokemon,
        pokemonList,
        setPokemonList,
        addPokemon,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};
