import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import { SearchBar, PokemonList } from "@/src/components/search";
import { usePokedex } from "@/src/store/PokedexContext";
import { fetchPokemonList } from "@/src/api/pokeapi";
import { PokemonListItem } from "@/@type/pokemon";

export default function Search() {
  const [query, setQuery] = useState('');
  const [bufferList, setBufferList] = useState<PokemonListItem[]>([]);
  const { pokemonList, setPokemonList } = usePokedex();

  useEffect(() => {
    const loadAllPokemons = async () => {
      try {
        console.log('Fetching Pokémon...');
        const raw = await fetchPokemonList();

        setPokemonList(raw);
        setBufferList(raw);
      } catch (e) {
        console.error('Failed to fetch pokemons:', e);
      }
    };

    loadAllPokemons();
  }, []);

  // 🔍 Met à jour bufferList à chaque changement de query
  const handleQueryChange = (text: string) => {
    setQuery(text);
    const filtered = filterPokemonListByName(pokemonList, text);
    setBufferList(filtered);
  };

  const filterPokemonListByName = (all: PokemonListItem[], query: string) => {
    return all.filter((p) => p.name.toLowerCase().startsWith(query.toLowerCase()));
  };

  return (
    <SafeAreaView>
      <SearchBar value={query} onChangeText={handleQueryChange} />
      <PokemonList pokemonList={bufferList} />
    </SafeAreaView>
  );
}
