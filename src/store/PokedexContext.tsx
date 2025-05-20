import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
  } from 'react';
  
  import { PokedexContextType, Pokemon } from '@/@type/pokemon';
  
  const PokedexContext = createContext<PokedexContextType>({} as PokedexContextType);
  
  export const usePokedex = () => useContext(PokedexContext);
  
  export const PokedexProvider = ({ children }: { children: ReactNode }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const addPokemon = (pokemon: Pokemon) => {
        if (pokemons.find(p => p.id === pokemon.id)) return;
        setPokemons([...pokemons, pokemon]);
      };
      
      return (
        <PokedexContext.Provider value={{ pokemons, addPokemon }}>
        {children}
      </PokedexContext.Provider>
      );
  };
