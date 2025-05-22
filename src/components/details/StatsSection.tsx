import React from 'react';
import styled from 'styled-components/native';
import { PokemonFull } from '@/@type/pokemon';

const StatsContainer = styled.View`
  width: 100%;
  padding: 16px;
  margin-top: 12px;
`;

const StatRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const StatName = styled.Text`
  width: 80px;
  font-weight: bold;
  color: #334155;
`;

const BarContainer = styled.View`
  flex: 1;
  height: 10px;
  background-color: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  margin-horizontal: 8px;
`;

const BarFill = styled.View<{ value: number }>`
  height: 100%;
  width: ${(p: any) => `${Math.min(p.value, 100)}%`};
  background-color: ${(p: any) => {
    if (p.value < 40) return '#ef4444';
    if (p.value < 60) return '#f97316';
    if (p.value < 80) return '#facc15';
    return '#22c55e';
  }};
  border-radius: 4px;
`;

const StatValue = styled.Text`
  width: 32px;
  text-align: right;
  font-weight: bold;
  color: #0f172a;
`;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type StatsSectionProps = {
  pokemon: PokemonFull;
};

const StatsSection: React.FC<StatsSectionProps> = ({ pokemon }) => {
  return (
    <StatsContainer>
      {pokemon.stats.map((s) => (
        <StatRow key={s.name}>
          <StatName>{cap(s.name)}</StatName>
          <BarContainer>
            <BarFill value={s.value} />
          </BarContainer>
          <StatValue>{s.value}</StatValue>
        </StatRow>
      ))}
    </StatsContainer>
  );
};

export default StatsSection;
