import React from 'react';
import { View, Text, Image } from 'react-native';
import { PokemonListItem } from '@/@type/pokemon';

interface Props {
    pokemon: PokemonListItem;
}

const PokemonCard: React.FC<Props> = ({ pokemon }: Props) => {
    return (
        <View>
            <Image source={{ uri: pokemon.url }} style={{ width: 72, height: 72 }}
                resizeMode="contain" />
            <Text>{pokemon.name}</Text>
        </View>
    );
};

export default PokemonCard;
