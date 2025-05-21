import React from 'react';
import { FlatList, Text } from 'react-native';
import { Pokemon } from '@/@type/pokemon';
import PokemonCard from './PokemonCard';

interface Props {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<Props> = ({ pokemons }: Props) => {
  return (
    pokemons.length !== 0 ? 
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PokemonCard pokemon={item} />
      )}
    />
    :
    <Text>No pokemon founded.</Text>
  );
};

export default PokemonList;
