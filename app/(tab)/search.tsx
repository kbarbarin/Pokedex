import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import { SearchBar, PokemonList, TypeFilterTabs } from "@/src/components/search";
import { usePokedex } from "@/src/store/PokedexContext";
import { fetchPokemonList, fetchPokemonsByType } from "@/src/api/pokeapi";
import { PokemonListItem } from "@/@type/pokemon";

export default function Search() {
    const [query, setQuery] = useState('');
    const [bufferList, setBufferList] = useState<PokemonListItem[]>([]);
    const [selectedType, setSelectedType] = useState('all');
    const { pokemonList, setPokemonList } = usePokedex();

    useEffect(() => {
        const loadAllPokemons = async () => {
            if (pokemonList.length === 0) {
                try {
                    console.log('Fetching Pokémon...');
                    const raw = await fetchPokemonList();

                    setPokemonList(raw);
                    setBufferList(raw);
                } catch (e) {
                    console.error('Failed to fetch pokemons:', e);
                }
            }
        };

        loadAllPokemons();
    }, []);

    // 🔍 Met à jour bufferList à chaque changement de query
    const handleQueryChange = (text: string) => {
        setQuery(text);
            const filtered = filterPokemonListByName(bufferList, text);
            setBufferList(filtered);
    };

    const handleTypeChange = async (type: string) => {
        console.log('type = ' + type);
        setSelectedType(type);
        if (type === 'all') {
            setBufferList(pokemonList);
        } else {
            const list = await fetchPokemonsByType(type);
            setBufferList(list);
        }
    }

    const filterPokemonListByName = (all: PokemonListItem[], query: string) => {
        return all.filter((p) => p.name.toLowerCase().startsWith(query.toLowerCase()));
    };

    return (
        <SafeAreaView>
            <SearchBar value={query} onChangeText={handleQueryChange} />
            <TypeFilterTabs selectedType={selectedType} onSelect={handleTypeChange} />
            <PokemonList pokemonList={bufferList} />
        </SafeAreaView>
    );
}
