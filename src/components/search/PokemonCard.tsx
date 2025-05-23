import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { usePokedex } from '@/src/store/PokedexContext';
import { enrichWithTypes } from '@/src/api/pokeapi';
import { PokemonListItem } from '@/@type/pokemon';

interface Props {
  pokemon: PokemonListItem;
}

const Card = styled.TouchableOpacity`
  width: 48%;
  background-color: #fff;
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 16px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ID = styled.Text`
  font-weight: 600;
  color: #888;
`;

const HeartButton = styled.TouchableOpacity``;

const SpriteContainer = styled.View`
  background-color: #fef9ef;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-vertical: 12px;
  padding: 12px;
`;

const Sprite = styled.Image`
  width: 72px;
  height: 72px;
`;

const Name = styled.Text`
  font-family: 'serif';
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const Types = styled.View`
  flex-direction: row;
  gap: 6px;
  margin-top: 8px;
`;

const TypeBadge = styled.Text<{ bgColor: string }>`
  background-color: ${({ bgColor }: any) => bgColor};
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
`;

const typeColors: Record<string, string> = {
  fire: '#F57D31',
  water: '#6493EB',
  grass: '#74CB48',
  electric: '#F9CF30',
  poison: '#A43E9E',
  flying: '#A891EC',
  bug: '#A7B723',
  normal: '#AAA67F',
  fairy: '#E69EAC',
  fighting: '#C12239',
  psychic: '#FB5584',
  rock: '#B69E31',
  ground: '#DEC16B',
  ice: '#9AD6DF',
  ghost: '#70559B',
  dragon: '#7037FF',
  dark: '#75574C',
  steel: '#B7B9D0',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const { updatePokemonTypes, favoriteList, toggleFavorite } = usePokedex();
  const [localPokemon, setLocalPokemon] = useState(pokemon);
  const isFavorite = favoriteList.some(p => p.name === pokemon.name);

  useEffect(() => {
    if (!pokemon.types) {
      enrichWithTypes(pokemon).then((updated) => {
        if (updated.types) {
          updatePokemonTypes(pokemon.name, updated.types);
          setLocalPokemon(updated);
        }
      });
    }
  }, [pokemon]);

  return (
    <Card onPress={() => router.push(`/details/${localPokemon.name}`)}>
      <Header>
        <ID>#{localPokemon.id.toString().padStart(3, '0')}</ID>
        <HeartButton onPress={() => toggleFavorite(localPokemon)}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? '#ef4444' : '#ccc'}
          />
        </HeartButton>
      </Header>

      <SpriteContainer>
        <Sprite source={{ uri: localPokemon.url }} resizeMode="contain" />
      </SpriteContainer>

      <Name>{capitalize(localPokemon.name)}</Name>

      {localPokemon.types && (
        <Types>
          {localPokemon.types.map((type) => (
            <TypeBadge key={type} bgColor={typeColors[type] || '#666'}>
              {capitalize(type)}
            </TypeBadge>
          ))}
        </Types>
      )}
    </Card>
  );
};

export default PokemonCard;
