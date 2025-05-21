import React from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

interface Props {
  selectedType: string;
  onSelect: (type: string) => void;
}

const types = ['All', 'Fire', 'Water', 'Grass', 'Electric', 'Poison', 'Bug', 'Normal', 'Flying'];

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

const TypeButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 6px 14px;
  background-color: ${({ active }) => (active ? '#3558CD' : '#f0f0f0')};
  border-radius: 20px;
`;

const TypeText = styled.Text<{ active: boolean }>`
  color: ${({ active }) => (active ? '#fff' : '#555')};
  font-weight: 600;
  font-size: 14px;
`;

const TypeFilterTabs: React.FC<Props> = ({ selectedType, onSelect }) => {
  return (
    <Container>
      <Scroll>
        {types.map((type) => (
          <TypeButton
            key={type}
            active={selectedType.toLowerCase() === type.toLowerCase()}
            onPress={() => onSelect(type.toLowerCase())}
          >
            <TypeText active={selectedType.toLowerCase() === type.toLowerCase()}>
              {type}
            </TypeText>
          </TypeButton>
        ))}
      </Scroll>
    </Container>
  );
};

export default TypeFilterTabs;
