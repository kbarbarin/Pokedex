import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { fetchPokemonDetails, fetchPokemonSpecies, fetchEvolutionChain, fetchMovesDetails } from '@/src/api/pokeapi';
import { PokemonFull } from '@/@type/pokemon';
import { AboutSection, EvolutionSection, MovesSection, StatsSection } from '@/src/components/details';
import { usePokedex } from '@/src/store/PokedexContext';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f9f9f9;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  z-index: 10;
`;

const Card = styled.View`
  background-color: #fff;
  margin: 16px;
  border-radius: 20px;
  padding: 20px;
  align-items: center;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
`;

const Name = styled.Text`
  font-size: 28px;
  font-family: cursive;
  font-weight: bold;
`;

const BadgeRow = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const TypeBadge = styled.Text<{ bgColor: string }>`
  background-color: ${(p) => p.bgColor};
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: bold;
  color: #fff;
  margin-right: 8px;
`;

const IdBadge = styled.Text`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #fef9c3;
  padding: 8px 12px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  font-weight: bold;
  color: #475569;
`;

const PokeImg = styled.Image`
  width: 150px;
  height: 150px;
  margin: 12px 0;
`;

const TabBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  border-top-width: 1px;
  border-top-color: #eee;
  padding-top: 12px;
`;

const TabTxt = styled.Text<{ active?: boolean }>`
  color: ${(p) => (p.active ? '#3b82f6' : '#9ca3af')};
  border-bottom-width: ${(p) => (p.active ? '2px' : '0px')};
  border-bottom-color: #3b82f6;
  padding-bottom: 6px;
  font-weight: ${(p) => (p.active ? 'bold' : 'normal')};
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

export default function Details() {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<PokemonFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'About' | 'Stats' | 'Evolution' | 'Moves'>('About');

  const { favoriteList, toggleFavorite } = usePokedex();
  const isFavorite = pokemon && favoriteList.some(p => p.name === pokemon.name);

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  useEffect(() => {
    if (typeof name !== 'string' || !name) return;

    const load = async () => {
      try {
        const data = await fetchPokemonDetails(name);
        const species = await fetchPokemonSpecies(data.id);
        const langEN = species.flavor_text_entries.find((f: any) => f.language.name === 'en');
        const description = langEN?.flavor_text.replace(/\f|\n/g, ' ') ?? '';

        const evoRaw = await fetchEvolutionChain(species.evolution_chain.url);
        const parseChain = (node: any, acc: string[] = []): string[] => {
          if (!node) return acc;
          acc.push(node.species.name);
          if (node.evolves_to?.length) {
            return parseChain(node.evolves_to[0], acc);
          }
          return acc;
        };
        const evolutions = parseChain(evoRaw.chain);

        const stats = data.stats?.map((s: any) => ({
          name: s.stat.name,
          value: s.base_stat,
        })) || [];

        const movesInitial = data.moves?.map((m: any) => {
          const details = m.version_group_details[0];
          return {
            name: m.move.name,
            level_learned_at: details.level_learned_at,
            move_learn_method: details.move_learn_method.name,
          };
        }) || [];

        const movesDetailsFromAPI = await fetchMovesDetails(movesInitial.map(m => m.name));

        const moves = movesInitial.map((m: any) => {
          const fullDetails = movesDetailsFromAPI.find(md => md.name === m.name);
          return {
            ...m,
            type: fullDetails?.type || 'normal',
            power: fullDetails?.power ?? null,
            accuracy: fullDetails?.accuracy ?? null,
            pp: fullDetails?.pp ?? null,
            description: fullDetails?.description ?? '',
          };
        });

        const merged: PokemonFull = {
          id: data.id,
          name: data.name,
          description,
          imageUrl:
            data.sprites?.other?.['official-artwork']?.front_default ||
            data.sprites?.front_default ||
            '',
          type: data.types?.map((t: any) => t.type.name) || [],
          stats,
          moves,
          evolutions,
        };

        setPokemon(merged);
      } catch (e) {
        console.error('Erreur fetch Pokémon :', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [name]);

  if (loading)
    return (
      <Container>
        <ActivityIndicator size="large" color="#ffcb05" />
      </Container>
    );

  if (!pokemon)
    return (
      <Container>
        <Text>Pokémon non trouvé.</Text>
      </Container>
    );

  return (
    <Container>
      <Header>
        <Pressable onPress={() => router.push('/search')}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </Pressable>
        <Pressable onPress={() => toggleFavorite({
          id: pokemon.id,
          name: pokemon.name,
          url: pokemon.imageUrl,
          types: pokemon.type,
        })}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#ef4444' : '#ccc'}
          />
        </Pressable>
      </Header>

      <Card>
        <Name>{cap(pokemon.name)}</Name>

        <BadgeRow>
          {pokemon.type.map((t) => (
            <TypeBadge key={t} bgColor={typeColors[t.toLowerCase()] || '#999'}>
              {cap(t)}
            </TypeBadge>
          ))}
        </BadgeRow>

        <IdBadge>#{String(pokemon.id).padStart(3, '0')}</IdBadge>
        <PokeImg source={{ uri: pokemon.imageUrl }} resizeMode="contain" />

        <TabBar>
          {(['About', 'Stats', 'Evolution', 'Moves'] as const).map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)}>
              <TabTxt active={activeTab === tab}>{tab}</TabTxt>
            </Pressable>
          ))}
        </TabBar>

        {activeTab === 'About' && <AboutSection description={pokemon.description} />}
        {activeTab === 'Stats' && <StatsSection pokemon={pokemon} />}
        {activeTab === 'Evolution' && <EvolutionSection pokemon={pokemon} />}
        {activeTab === 'Moves' && <MovesSection pokemon={pokemon} />}
      </Card>
    </Container>
  );
}
