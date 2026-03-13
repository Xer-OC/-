import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Card } from '../ui/components/Card';
import { theme } from '../ui/theme';
import { loginWithApple, loginWithGoogle, loginWithTelegram } from '../auth/ssoService';
import { getLinkedAccounts, linkAccount, unlinkAccount } from '../services/accountLinkService';

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
  const [linked, setLinked] = useState<string[]>([]);
  const [activeProfile, setActiveProfile] = useState('No SSO profile loaded');

  useEffect(() => {
    // Security note: external OAuth/session tokens must be stored in secure storage
    // (expo-secure-store / platform keychain), never plaintext storage.
    void getLinkedAccounts().then((items) => setLinked(items));
  }, []);

  const toggleLinked = async (provider: 'email' | 'google' | 'apple' | 'telegram') => {
    const next = linked.includes(provider) ? await unlinkAccount(provider) : await linkAccount(provider);
    setLinked(next);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integrations</Text>
      <Text style={styles.subtitle}>Enable or disable bridge sources. Users must opt in before data mirror is active.</Text>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>SSO Identity</Text>
        <Pressable style={styles.actionBtn} onPress={() => void loginWithGoogle().then((u) => setActiveProfile(`${u.displayName} via Google`))}>
          <Text style={styles.actionText}>Login with Google</Text>
        </Pressable>
        <Pressable style={styles.actionBtn} onPress={() => void loginWithApple().then((u) => setActiveProfile(`${u.displayName} via Apple`))}>
          <Text style={styles.actionText}>Login with Apple</Text>
        </Pressable>
        <Pressable style={styles.actionBtn} onPress={() => void loginWithTelegram().then((u) => setActiveProfile(`${u.displayName} via Telegram`))}>
          <Text style={styles.actionText}>Login with Telegram</Text>
        </Pressable>
        <Text style={styles.activeProfile}>{activeProfile}</Text>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Account Linking</Text>
        {(['google', 'apple', 'telegram'] as Array<'google' | 'apple' | 'telegram'>).map((provider) => (
          <Pressable key={provider} style={styles.linkRow} onPress={() => void toggleLinked(provider)}>
            <Text style={styles.label}>{provider}</Text>
            <Text style={styles.linkStatus}>{linked.includes(provider) ? 'Linked' : 'Not Linked'}</Text>
          </Pressable>
        ))}
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Message Integrations</Text>
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
  section: { marginBottom: 10 },
  sectionTitle: { color: theme.colors.textPrimary, fontWeight: '700', marginBottom: 8 },
  actionBtn: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 9,
    paddingHorizontal: 10,
    marginBottom: 6,
    backgroundColor: theme.colors.surface
  },
  actionText: { color: theme.colors.textPrimary, fontWeight: '600' },
  activeProfile: { color: theme.colors.textSecondary, marginTop: 4 },
  linkRow: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  linkStatus: { color: '#60A5FA', fontWeight: '600' },
  row: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: { color: theme.colors.textPrimary, fontWeight: '600' }
});
