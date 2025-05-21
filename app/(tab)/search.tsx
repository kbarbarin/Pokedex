import React, { useState } from "react";
import { SafeAreaView } from "react-native";

import { SearchBar, PokemonList } from "@/src/components/search";
import { usePokedex } from "@/src/store/PokedexContext";

export default function Search() {
    const [query, setQuery] = useState('');
    const { pokemons } = usePokedex();

    return (
        <SafeAreaView>
            <SearchBar value={query} onChangeText={setQuery} />
            <PokemonList pokemons={pokemons} />
        </SafeAreaView>

    )
}