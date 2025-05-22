import React from 'react';
import styled from 'styled-components/native';

import { usePokedex } from '@/src/store/PokedexContext';
import { PokemonFull } from '@/@type/pokemon';

const EvolutionContainer = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { alignItems: 'center', paddingHorizontal: 16 },
}))`
  margin-top: 20px;
`;

const EvoCard = styled.View`
  background-color: #fff;
  padding: 12px;
  border-radius: 12px;
  align-items: center;
  margin-right: 16px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  width: 100px;
`;

const EvoImage = styled.Image`
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
`;

const EvoName = styled.Text`
  font-weight: bold;
  text-transform: capitalize;
  text-align: center;
`;

const Arrow = styled.Text`
  font-size: 24px;
  margin-right: 16px;
  color: #888;
`;

type EvolutionSectionProps = {
  pokemon: PokemonFull;
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const EvolutionSection: React.FC<EvolutionSectionProps> = ({ pokemon }) => {
  const { pokemonList } = usePokedex();

  const getPokemonId = (pokemonName: string): number | null => {
    const found = pokemonList.find(
      (p) => p.name.toLowerCase() === pokemonName.toLowerCase()
    );
    return found ? found.id : null;
  };

  return (
    <EvolutionContainer>
      {pokemon.evolutions.map((evoName, i) => {
        const id = getPokemonId(evoName);
        const spriteUrl = id
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          : undefined;

        return (
          <React.Fragment key={evoName}>
            <EvoCard>
              {spriteUrl && <EvoImage source={{ uri: spriteUrl }} />}
              <EvoName>{cap(evoName)}</EvoName>
            </EvoCard>
            {i < pokemon.evolutions.length - 1 && <Arrow>→</Arrow>}
          </React.Fragment>
        );
      })}
    </EvolutionContainer>
  );
};

export default EvolutionSection;
