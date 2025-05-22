import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, Pressable, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import {
  fetchPokemonDetails,
  fetchPokemonSpecies,
  fetchEvolutionChain,
} from '@/src/api/pokeapi';
import { Pokemon } from '@/@type/pokemon';

/* -------------------------------------------------------------------------- */
/*                                 STYLES                                     */
/* -------------------------------------------------------------------------- */
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
  width: ${(p) => `${Math.min(p.value, 100)}%`};
  background-color: ${(p) => {
    if (p.value < 40) return '#ef4444'; // rouge
    if (p.value < 60) return '#f97316'; // orange
    if (p.value < 80) return '#facc15'; // jaune
    return '#22c55e'; // vert
  }};
  border-radius: 4px;
`;


const StatValue = styled.Text`
  width: 32px;
  text-align: right;
  font-weight: bold;
  color: #0f172a;
`;


/* -------------------------------------------------------------------------- */
/*                            DONNÉES UTILITAIRES                             */
/* -------------------------------------------------------------------------- */
const typeColors: Record<string, string> = {
  fire: '#F57D31', water: '#6493EB', grass: '#74CB48', electric: '#F9CF30',
  poison: '#A43E9E', flying: '#A891EC', bug: '#A7B723', normal: '#AAA67F',
  fairy: '#E69EAC', fighting: '#C12239', psychic: '#FB5584', rock: '#B69E31',
  ground: '#DEC16B', ice: '#9AD6DF', ghost: '#70559B', dragon: '#7037FF',
  dark: '#75574C', steel: '#B7B9D0',
};

/* -------------------------------------------------------------------------- */
/*                                 TYPES                                      */
/* -------------------------------------------------------------------------- */
type PokemonFull = Pokemon & {
  stats: { name: string; value: number }[];
  moves: string[];
  evolutions: string[];
};

/* -------------------------------------------------------------------------- */
/*                                COMPOSANT                                   */
/* -------------------------------------------------------------------------- */
export default function Details() {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<PokemonFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] =
    useState<'About' | 'Stats' | 'Evolution' | 'Moves'>('About');

  /* --------------------------- UTILS LOCAUX --------------------------- */
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  /* ----------------------------- FETCH -------------------------------- */
  useEffect(() => {
    if (typeof name !== 'string') return;

    const load = async () => {
      try {
        /* 1. Détails de base ------------------------------------------------ */
        const data = await fetchPokemonDetails(name);

        /* 2. Species : description + url de la chaîne d’évo ----------------- */
        const species = await fetchPokemonSpecies(data.id);
        const langFR = species.flavor_text_entries.find(
          (f: any) => f.language.name === 'fr'
        );
        const langEN = species.flavor_text_entries.find(
          (f: any) => f.language.name === 'en'
        );
        const description =
          (langFR ?? langEN)?.flavor_text.replace(/\f|\n/g, ' ') ?? '';

        /* 3. Évolutions ----------------------------------------------------- */
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

        /* 4. Stats + Moves -------------------------------------------------- */
        const stats = data.stats?.map((s: any) => ({
          name: s.stat.name,
          value: s.base_stat,
        })) || [];

        const moves = data.moves?.map((m: any) => m.move.name) || [];

        /* 5. Assemblage ----------------------------------------------------- */
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

  /* --------------------------- RENDERING ------------------------------ */
  if (loading)
    return (
      <Container>
        <ActivityIndicator size="large" color="#ffcb05" />
      </Container>
    );

  return (
    <Container>
      {/* ---------- Header ---------- */}
      <Header>
        <Pressable onPress={() => router.push('/search')}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </Pressable>
        <Ionicons name="heart-outline" size={24} color="#ccc" />
      </Header>

      {/* ---------- Card principal ---------- */}
      <Card>
        <Name>{cap(pokemon.name)}</Name>

        {/* Types */}
        <BadgeRow>
          {pokemon.type.map((t) => (
            <TypeBadge key={t} bgColor={typeColors[t.toLowerCase()] || '#999'}>
              {cap(t)}
            </TypeBadge>
          ))}
        </BadgeRow>

        {/* Id + image */}
        <IdBadge>#{String(pokemon.id).padStart(3, '0')}</IdBadge>
        <PokeImg source={{ uri: pokemon.imageUrl }} resizeMode="contain" />

        {/* Tabs */}
        <TabBar>
          {(['About', 'Stats', 'Evolution', 'Moves'] as const).map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)}>
              <TabTxt active={activeTab === tab}>{tab}</TabTxt>
            </Pressable>
          ))}
        </TabBar>

        {/* ----------- Contenu des onglets ----------- */}
        {activeTab === 'About' && (
          <Text style={{ marginTop: 20, textAlign: 'center' }}>
            {pokemon.description || 'Pas encore de description.'}
          </Text>
        )}

        {activeTab === 'Stats' && (
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
        )}


        {activeTab === 'Evolution' && (
          <Text style={{ marginTop: 20, textAlign: 'center' }}>
            {pokemon.evolutions.map(cap).join(' → ')}
          </Text>
        )}

        {activeTab === 'Moves' && (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            {pokemon.moves.slice(0, 10).map((m) => (
              <Text key={m}>{cap(m)}</Text>
            ))}
            {pokemon.moves.length > 10 && (
              <Text style={{ marginTop: 8 }}>
                … et {pokemon.moves.length - 10} autres
              </Text>
            )}
          </View>
        )}
      </Card>
    </Container>
  );
}
