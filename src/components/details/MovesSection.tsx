import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { PokemonFull } from '@/@type/pokemon';

const MovesContainer = styled.ScrollView`
  margin-top: 20px;
  width: 100%;
  max-height: 300px;
`;

const MoveGroupTitle = styled.Text`
  font-weight: 700;
  font-size: 18px;
  color: #1e40af;
  margin-bottom: 12px;
`;

const MoveItem = styled.View`
  background-color: #e0e7ff;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MoveName = styled.Text`
  font-weight: 600;
  color: #1e3a8a;
  text-transform: capitalize;
`;

const MoveDetails = styled.Text`
  font-size: 12px;
  color: #475569;
  font-style: italic;
`;

type MoveDetailsType = {
  name: string;
  level_learned_at: number | null;
  move_learn_method: string;
  type: string;
  power?: number | null;
  accuracy?: number | null;
  pp?: number | null;
  description?: string;
};

type MovesSectionProps = {
  pokemon: PokemonFull;
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const MovesSection: React.FC<MovesSectionProps> = ({ pokemon }) => {
  const groupedMoves = pokemon.moves.reduce<Record<string, MoveDetailsType[]>>((acc, move) => {
    const method = move.move_learn_method.replace(/-/g, ' ');
    if (!acc[method]) acc[method] = [];
    acc[method].push(move);
    return acc;
  }, {});

  return (
    <MovesContainer>
      {Object.entries(groupedMoves).map(([method, moves]) => (
        <View key={method} style={{ marginBottom: 20 }}>
          <MoveGroupTitle>{cap(method)}</MoveGroupTitle>
          {moves.map((move) => (
            <MoveItem key={move.name}>
              <View>
                <MoveName>{cap(move.name.replace(/-/g, ' '))}</MoveName>
                <MoveDetails>{move.description}</MoveDetails>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <MoveDetails>Type: {cap(move.type)}</MoveDetails>
                <MoveDetails>Power: {move.power ?? '-'}</MoveDetails>
                <MoveDetails>Accuracy: {move.accuracy ?? '-'}</MoveDetails>
                <MoveDetails>PP: {move.pp ?? '-'}</MoveDetails>
                <MoveDetails>
                  {move.level_learned_at ? `Lvl ${move.level_learned_at}` : ''}
                </MoveDetails>
              </View>
            </MoveItem>
          ))}
        </View>
      ))}
    </MovesContainer>
  );
};

export default MovesSection;
