import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PokedexProvider } from '@/src/store/PokedexContext';
import { SafeAreaView } from 'react-native';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <PokedexProvider>
                <Slot />
            </PokedexProvider>
        </SafeAreaProvider>
    );
}
