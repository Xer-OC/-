import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Card } from '../ui/components/Card';
import { theme } from '../ui/theme';

type IntegrationKey = 'telegram' | 'discord' | 'slack' | 'notification';

type IntegrationState = Record<IntegrationKey, boolean>;

const defaultState: IntegrationState = {
  telegram: true,
  discord: true,
  slack: false,
  notification: true
};

export function IntegrationsScreen() {
  const [state, setState] = useState<IntegrationState>(defaultState);

  useEffect(() => {
    // Security note: external OAuth/session tokens must be stored in secure storage
    // (expo-secure-store / platform keychain), never plaintext storage.
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integrations</Text>
      <Text style={styles.subtitle}>Enable or disable bridge sources. Users must opt in before data mirror is active.</Text>

      <Card>
        {(['telegram', 'discord', 'slack', 'notification'] as IntegrationKey[]).map((key) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{key === 'notification' ? 'Notification Mirror' : key[0].toUpperCase() + key.slice(1)}</Text>
            <Switch value={state[key]} onValueChange={(value) => setState((prev) => ({ ...prev, [key]: value }))} />
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md, backgroundColor: theme.colors.background },
  title: { ...theme.typography.titleLarge, color: theme.colors.textPrimary, marginBottom: 6 },
  subtitle: { color: theme.colors.textSecondary, marginBottom: theme.spacing.md },
  row: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: { color: theme.colors.textPrimary, fontWeight: '600' }
});
