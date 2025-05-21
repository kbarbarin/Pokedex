import React from 'react';
import { View, Text } from 'react-native';
import { Pokemon } from '@/@type/pokemon';

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }: Props) => {
  return (
    <View>
      <Text>{pokemon.name}</Text>
    </View>
  );
};

export default PokemonCard;
