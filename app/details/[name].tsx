import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styled from 'styled-components/native';
import { fetchPokemonDetails } from '@/src/api/pokeapi';
import { Pokemon } from '@/@type/pokemon';


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

const BackTxt = styled.Text`
  font-size: 24px;
`;

const IconRow = styled.View`
  flex-direction: row;
`;

const IconTxt = styled.Text`
  font-size: 18px;
  margin-left: 16px;
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

const TypeBadge = styled.Text`
  background-color: #facc15;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: bold;
  color: #333;
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


export default function Details() {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'About' | 'Stats' | 'Evolution' | 'Moves'>('About');

  useEffect(() => {
    const load = async () => {
      if (typeof name !== 'string') return;
      try {
        const data = await fetchPokemonDetails(name);
        const p: Pokemon = {
          id: data.id,
          name: data.name,
          description: data.species?.url ?? '',
          imageUrl:
            data.sprites?.other?.['official-artwork']?.front_default ||
            data.sprites?.front_default ||
            '',
          type: data.types.map((t: any) => t.type.name),
        };
        setPokemon(p);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [name]);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  if (loading) return <ActivityIndicator size="large" color="#ffcb05" />;
  if (!pokemon) return <Text>Pas de données disponibles</Text>;

  return (
    <Container>
      <Header>
        <Pressable onPress={() => router.back()}>
          <BackTxt>{'<'}</BackTxt>
        </Pressable>

        <IconRow>
          <IconTxt>♡</IconTxt>
          <IconTxt>⇪</IconTxt>
        </IconRow>
      </Header>
      <Card>
        <Name>{capitalize(pokemon.name)}</Name>

        <BadgeRow>
          {pokemon.type.map((t) => (
            <TypeBadge key={t}>{capitalize(t)}</TypeBadge>
          ))}
        </BadgeRow>

        <IdBadge>#{String(pokemon.id).padStart(3, '0')}</IdBadge>

        <PokeImg source={{ uri: pokemon.imageUrl }} resizeMode="contain" pointerEvents="none" />
        <TabBar>
          {(['About', 'Stats', 'Evolution', 'Moves'] as const).map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)}>
              <TabTxt active={activeTab === tab}>{tab}</TabTxt>
            </Pressable>
          ))}
        </TabBar>

        {activeTab === 'About' && (
          <Text style={{ marginTop: 20, textAlign: 'center' }}>
            {pokemon.description || 'No description yet.'}
          </Text>
        )}
        {activeTab === 'Stats' && (
          <Text style={{ marginTop: 20 }}>Statistiques à venir…</Text>
        )}
        {activeTab === 'Evolution' && (
          <Text style={{ marginTop: 20 }}>Chaîne d’évolution à venir…</Text>
        )}
        {activeTab === 'Moves' && (
          <Text style={{ marginTop: 20 }}>Liste des attaques à venir…</Text>
        )}
      </Card>
    </Container>
  );
}
