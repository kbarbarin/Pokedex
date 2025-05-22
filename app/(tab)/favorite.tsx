import { PokemonList } from "@/src/components/search";
import { usePokedex } from "@/src/store/PokedexContext";
import React from "react";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
  background-color: #f8fafc;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 16px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #94a3b8;
  font-style: italic;
`;

export default function Favorite() {
  const { favoriteList } = usePokedex();

  return (
    <Container>
      <Title>Mes favoris ❤️</Title>

      {favoriteList.length > 0 ? (
        <PokemonList pokemonList={favoriteList} />
      ) : (
        <EmptyContainer>
          <EmptyText>Aucun Pokémon en favori pour l'instant.</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
}
