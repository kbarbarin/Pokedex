import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { PokemonListItem } from '@/@type/pokemon';
import PokemonCard from './PokemonCard';

interface Props {
    pokemonList: PokemonListItem[];
}

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const EmptyText = styled.Text`
  text-align: center;
  margin-top: 32px;
  font-size: 16px;
  color: #888;
`;

const Separator = styled.View`
  height: 16px;
`;

const PokemonList: React.FC<Props> = ({ pokemonList }) => {
    return (
        <View>
            {pokemonList.length > 0 ? (
                <FlatList
                    data={pokemonList}
                    keyExtractor={(item) => item.name}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginBottom: 16,
                    }}
                    renderItem={({ item }) => <PokemonCard pokemon={item} />}
                    ItemSeparatorComponent={() => <Separator />}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Text>No Pokémon found.</Text>
            )}
        </View>
    );
};

export default PokemonList;
