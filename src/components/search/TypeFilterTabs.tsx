import React from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

interface Props {
  selectedType: string;
  onSelect: (type: string) => void;
}

const types = [
  'All',
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Poison',
  'Bug',
  'Normal',
  'Flying',
  'Fairy',
  'Fighting',
  'Psychic',
  'Rock',
  'Ground',
  'Ice',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
];

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

const Container = styled.View`
  padding: 0 12px;
  margin-bottom: 12px;
`;

const Scroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    gap: 8,
    paddingVertical: 8,
  },
})``;

const TypeButton = styled.TouchableOpacity<{ background: string }>`
  padding: 6px 14px;
  background-color: ${({ background }: any) => background};
  border-radius: 20px;
`;

const TypeText = styled.Text<{ active: boolean }>`
  color: ${({ active }: any) => (active ? '#fff' : '#555')};
  font-weight: 600;
  font-size: 14px;
`;

const TypeFilterTabs: React.FC<Props> = ({ selectedType, onSelect }) => {
  return (
    <Container>
      <Scroll>
        {types.map((type) => {
          const typeKey = type.toLowerCase();
          const isActive = selectedType === typeKey;
          const backgroundColor = isActive
            ? typeColors[typeKey] || '#666'
            : '#eee';

          return (
            <TypeButton
              key={type}
              background={backgroundColor}
              onPress={() => onSelect(typeKey)}
            >
              <TypeText active={isActive}>{type}</TypeText>
            </TypeButton>
          );
        })}
      </Scroll>
    </Container>
  );
};

export default TypeFilterTabs;
