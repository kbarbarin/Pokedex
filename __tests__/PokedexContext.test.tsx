import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, Button } from 'react-native';
import { PokedexProvider, usePokedex } from '@/context/PokedexContext';
import { Pokemon } from '@/@type/pokemon';

const TestComponent = () => {
  const { pokemons, addPokemon } = usePokedex();

  const dummy: Pokemon = {
    id: 1,
    name: 'Bulbasaur',
    description: 'A seed Pokémon',
    imageUrl: 'https://pokeapi.co/media/sprites/pokemon/1.png',
    type: ['grass', 'poison'],
  };

  return (
    <>
      <Button title="Add" onPress={() => addPokemon(dummy)} />
      <Text testID="count">{pokemons.length}</Text>
      {pokemons.map(p => (
        <Text key={p.id}>{p.name}</Text>
      ))}
    </>
  );
};

describe('PokedexContext', () => {
  it('adds a new Pokémon correctly', () => {
    const { getByText, getByTestId } = render(
      <PokedexProvider>
        <TestComponent />
      </PokedexProvider>
    );

    expect(getByTestId('count').props.children).toBe(0);

    getByText('Add').props.onPress();

    expect(getByTestId('count').props.children).toBe(1);
    expect(getByText('Bulbasaur')).toBeTruthy();
  });

  it('does not add duplicate Pokémon', () => {
    const { getByText, getByTestId } = render(
      <PokedexProvider>
        <TestComponent />
      </PokedexProvider>
    );

    const button = getByText('Add');

    button.props.onPress();
    button.props.onPress();
    expect(getByTestId('count').props.children).toBe(1);
  });
});
