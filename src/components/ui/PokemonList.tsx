import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { PokemonListItem } from '@/@type/pokemon';
import PokemonCard from '../search/PokemonCard';

interface Props {
  pokemonList: PokemonListItem[];
}

const Container = styled.View`
  padding: 16px;
  background-color: #fff;
`;

const EmptyText = styled.Text`
  text-align: center;
  margin-top: 32px;
  font-size: 16px;
  color: #888;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const PokemonList: React.FC<Props> = ({ pokemonList }) => {
  return (
    <Container>
      {pokemonList.length > 0 ? (
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => item.name}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyText>No Pokémon found.</EmptyText>
      )}
    </Container>
  );
};

export default PokemonList;
