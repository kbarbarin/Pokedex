import React from 'react';
import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 8px 12px;
  margin: 16px;
  elevation: 2;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333;
  margin-left: 8px;
`;

interface Props extends TextInputProps {
  icon?: string;
}

const SearchBar: React.FC<Props> = ({ icon = 'search', ...props }) => (
  <Container>
    <Ionicons name={icon as any} size={20} color="#aaa" />
    <Input
      placeholder="Search Pokémon"
      placeholderTextColor="#aaa"
      {...props}
    />
  </Container>
);

export default SearchBar;
