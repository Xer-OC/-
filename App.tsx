import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ensureUserKeyPair } from './src/crypto/keyManager';
import { RootNavigator } from './src/navigation/root-navigator';
import { theme } from './src/ui/theme';
import { useAuthStore } from './src/auth/authStore';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.textPrimary,
    border: theme.colors.border,
    primary: theme.colors.primary
  }
};

export default function App() {
  const { hydrate, user, signIn } = useAuthStore();

  useEffect(() => {
    void ensureUserKeyPair();
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!user) {
      void signIn('you');
    }
  }, [user, signIn]);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={appTheme}>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
