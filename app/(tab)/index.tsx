import React from 'react';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 32px 24px 16px;
`;

const Header = styled.View`
  align-items: center;
  margin-top: 24px;
`;

const Image = styled.Image`
  width: 140px;
  height: 140px;
  margin-bottom: 24px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: 800;
  color: #0f172a;
  text-align: center;
  margin-bottom: 18px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #475569;
  text-align: center;
  max-width: 300px;
  margin-bottom: 18px;
`;

const Button = styled.TouchableOpacity`
  background-color: #3b82f6;
  padding: 16px 28px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
  elevation: 4;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: 700;
  margin-left: 10px;
`;

const LinkButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

const LinkText = styled.Text`
  color: #1d4ed8;
  font-size: 15px;
  text-decoration: underline;
`;

const Footer = styled.Text`
  color: #94a3b8;
  font-size: 12px;
  text-align: center;
  margin-top: auto;
`;

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <Header>
      <Image source={require('@/assets/images/pokeball.png')} resizeMode="contain" />
        <Title>Bienvenue dans le Pokédex</Title>
        <Subtitle>
          Trouvez vos Pokémon préférés, découvrez leurs capacités, stats et ajoutez-les à vos favoris !
        </Subtitle>
      </Header>

      <Button onPress={() => router.push('/search')}>
        <Ionicons name="search" size={20} color="#fff" />
        <ButtonText>Accéder au Pokédex</ButtonText>
      </Button>

      <Button onPress={() => router.push('/favorite')}>
        <Ionicons name="heart" size={20} color="#fff" />
        <ButtonText>Accéder à vos favoris</ButtonText>
      </Button>

      <Footer>Version 1.0 — Powered by PokéAPI</Footer>
    </Container>
  );
}
