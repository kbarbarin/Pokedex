import React, {useState} from "react";
import { View, Text } from "react-native";

import SearchBar from "@/src/components/search/SearchBar";

export default function Search () {
    const [query, setQuery] = useState('');

    return (
        <View>
            <SearchBar value={query} onChangeText={setQuery} />
            <Text>SearchScreen</Text>
        </View>
    )
}