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
    const { pokemonList, setPokemonList, getPokemonTypes } = usePokedex();

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
            } else {
                setBufferList(pokemonList);
            }
        };

        loadAllPokemons();
    }, []);

    const handleQueryChange = (text: string) => {
        setQuery(text);
        const filtered = filterPokemonListByName(pokemonList, text);
        setBufferList(filtered);

    }; // Problème : ne marche pas quand on a un type selectionner / pour ça remplacer par bufferList

    const fillWithKnownTypes = (list: { id: number, name: string, url: string }[]) => {
        return list.map(pokemon => {
            const types = getPokemonTypes(pokemon.name);
            return {
                ...pokemon,
                types: types || [],
            };
        });
    }

    const handleTypeChange = async (type: string) => {
        setSelectedType(type);
        if (type === 'all') {
            setBufferList(pokemonList);
        } else {
            const list = await fetchPokemonsByType(type);
            const knownTypedList = fillWithKnownTypes(list);
            setBufferList(knownTypedList);
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
