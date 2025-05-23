# 📱 Pokedex – React Native + TypeScript

Une application mobile qui interroge l’API **PokéAPI** pour explorer les Pokémon, filtrer par type, consulter les fiches détaillées et gérer vos favoris.

---

## 🎯 Objectif

Création d’une application mobile React Native pour afficher des informations sur les Pokémon via l'API ouverte [PokéAPI](https://pokeapi.co).

Ce projet a été réalisé dans le cadre d’un test technique.

---

## ⚙️ Installation & Lancement

```bash
# 1. Cloner le dépôt
git clone git@github.com:kbarbarin/Pokedex.git
cd Pokedex

# 2. Installer les dépendances
npm install
# ou
yarn install

# 3. Lancer l'application
npx expo start
```

## ⚠️ Important

Ne pas utiliser l’émulateur **iOS 18.4** (incompatibilité avec JavaScriptCore).  
Préférez les versions **iOS ≤ 18.3, **Android (API 34+)**, ou un **appareil physique**.

---

## ✨ Fonctionnalités

### 🔍 Recherche instantanée
- Chaque frappe dans la barre de recherche filtre la liste de Pokémon en temps réel.

### 🧩 Filtrage par type
- Navigation par onglets : Tous, Feu, Eau, Plante, etc.

### 📃 Liste de Pokémon
- Affichage en grille (2 colonnes)
- Carte contenant :
  - Sprite
  - Nom
  - ID
  - Types
  - Bouton "favori"

### ❤️ Ajout aux favoris
- Icône cœur cliquable (plein si déjà favori)
- Affichage d’une liste dédiée aux favoris

### 📄 Détails complets d’un Pokémon
- **About** : taille, poids, description
- **Stats** : barres de progression colorées
- **Évolution** : affichage de la chaîne d'évolution
- **Mouvements** : moves groupés par méthode (level-up, machine, etc.)

### 🔄 Chargement intelligent des types
- Optimisation pour éviter les appels API redondants

### ⚠️ Gestion des erreurs
- Feedback utilisateur clair
- Logs dans la console pour le debug

---

## 🛠️ Choix Techniques

| Besoin               | Choix Technique              | Justification                                                                 |
|----------------------|------------------------------|-------------------------------------------------------------------------------|
| Structure typée      | React Native + TypeScript    | Robustesse et maintenabilité du code                                          |
| Gestion d’état       | `useContext` + `useReducer`  | Suffisant pour ce cas, Redux aurait été trop verbeux et complexe              |
| Appels API           | `axios`                      | Simplicité d'utilisation et bonne gestion des erreurs                         |
| UI / Styles          | `styled-components/native`   | Styles dynamiques, code lisible, composants réutilisables                     |
| Navigation           | `expo-router`                | Simplicité grâce au file-based routing adapté à React Native                 |
| Données externes     | PokéAPI                      | API gratuite, bien documentée, pas besoin de backend personnalisé             |
| Favoris              | Contexte local               | Léger, pas besoin de persistance pour le test                                 |

---

## 📝 Consigne d'origine

> **Test Technique : Création d'une application React Native avec l'API Pokémon**

- ✅ React Native & TypeScript  
- ✅ Affichage des Pokémon via PokéAPI  
- ✅ Gestion d’état (Redux facultatif mais justifié)  
- ✅ Écran liste + fiche détaillée  
- ✅ Utilisation de styled-components  
- ✅ Suivi des bonnes pratiques  
- ✅ Bonus : infinite scroll

---

## 🤝 Contributions

Les suggestions, issues et pull requests sont les bienvenues !

---

## 🧑‍💻 Auteur

Développé par **[kbarbarin](https://github.com/kbarbarin)**  
_"Attrapez-les tous !"_
