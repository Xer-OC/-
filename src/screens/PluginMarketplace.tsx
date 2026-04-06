import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { mockServer } from '../api/mockServer';
import { installPlugin, listInstalledPlugins } from '../plugins/PluginManager';
import { registerPlugin, getPlugins } from '../plugins/PluginRegistry';
import { Card } from '../ui/components/Card';
import { theme } from '../ui/theme';

function ensureDefaultPlugins() {
  if (getPlugins().length) return;

  registerPlugin({
    id: 'plugin-auto-archive',
    name: 'Auto Archive Assistant',
    description: 'Automatically archives low-priority message threads.',
    version: '1.0.0',
    permissions: ['read_messages', 'send_messages'],
    async initialize() {},
    renderUI() {
      return 'Auto Archive Assistant UI';
    },
    async handleEvent() {}
  });

  registerPlugin({
    id: 'plugin-room-insights',
    name: 'Room Insights',
    description: 'Surfaces watch-room activity spikes and recommendations.',
    version: '1.1.0',
    permissions: ['read_rooms', 'write_rooms'],
    async initialize() {},
    renderUI() {
      return 'Room Insights UI';
    },
    async handleEvent() {}
  });
}

export function PluginMarketplace() {
  const [installedIds, setInstalledIds] = useState<string[]>([]);

  useEffect(() => {
    ensureDefaultPlugins();
    const installed = listInstalledPlugins(mockServer.currentUserId);
    setInstalledIds(installed.map((item) => item.plugin_id));
  }, []);

  const plugins = getPlugins();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plugin Marketplace</Text>
      {plugins.map((plugin) => {
        const installed = installedIds.includes(plugin.id);
        return (
          <Card key={plugin.id} style={styles.card}>
            <Text style={styles.name}>{plugin.name}</Text>
            <Text style={styles.description}>{plugin.description}</Text>
            <Text style={styles.version}>v{plugin.version}</Text>
            <Text style={styles.permissions}>Permissions: {plugin.permissions.join(', ')}</Text>
            <Pressable
              style={[styles.installBtn, installed && styles.installBtnInstalled]}
              onPress={() => {
                installPlugin(mockServer.currentUserId, plugin);
                setInstalledIds((prev) => (prev.includes(plugin.id) ? prev : [...prev, plugin.id]));
              }}
            >
              <Text style={styles.installText}>{installed ? 'Installed' : 'Install Plugin'}</Text>
            </Pressable>
          </Card>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md, backgroundColor: theme.colors.background },
  title: { ...theme.typography.titleLarge, color: theme.colors.textPrimary, marginBottom: 10 },
  card: { marginBottom: 10 },
  name: { color: theme.colors.textPrimary, fontWeight: '700', marginBottom: 4 },
  description: { color: theme.colors.textSecondary, marginBottom: 4 },
  version: { color: theme.colors.textSecondary, fontSize: 12 },
  permissions: { color: theme.colors.textSecondary, fontSize: 12, marginBottom: 8 },
  installBtn: {
    alignSelf: 'flex-start',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  installBtnInstalled: { backgroundColor: '#065F46' },
  installText: { color: theme.colors.textPrimary, fontWeight: '600' }
});
