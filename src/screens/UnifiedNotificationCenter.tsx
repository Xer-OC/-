import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { mockServer } from '../api/mockServer';
import { Card } from '../ui/components/Card';
import { theme } from '../ui/theme';

type Tab = 'all' | 'telegram' | 'discord' | 'rooms' | 'farm';

export function UnifiedNotificationCenter() {
  const [tab, setTab] = useState<Tab>('all');

  const items = useMemo(() => {
    return mockServer.notifications.filter((item) => {
      if (tab === 'all') return true;
      if (tab === 'rooms') return item.type === 'room_invite';
      if (tab === 'farm') return item.type === 'farm_action';
      return item.sourceApp === tab;
    });
  }, [tab]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unified Notification Center</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {(['all', 'telegram', 'discord', 'rooms', 'farm'] as Tab[]).map((item) => (
          <Pressable key={item} onPress={() => setTab(item)} style={[styles.tab, tab === item && styles.tabActive]}>
            <Text style={styles.tabText}>{item[0].toUpperCase() + item.slice(1)}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView>
        {items.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Text style={styles.item}>{item.type} • {item.sourceApp}</Text>
          </Card>
        ))}
        {!items.length ? <Text style={styles.empty}>No notifications for this filter.</Text> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md, backgroundColor: theme.colors.background },
  title: { ...theme.typography.titleLarge, color: theme.colors.textPrimary, marginBottom: 10 },
  tabs: { gap: 8, marginBottom: 10 },
  tab: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: theme.colors.surface },
  tabActive: { backgroundColor: theme.colors.primary },
  tabText: { color: theme.colors.textPrimary, fontWeight: '600' },
  card: { marginBottom: 8 },
  item: { color: theme.colors.textPrimary, textTransform: 'capitalize' },
  empty: { color: theme.colors.textSecondary }
});
