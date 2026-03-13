import { StyleSheet, Text, View } from 'react-native';
import { SourceApp } from '../models/AggregatedMessage';
import { theme } from '../ui/theme';

const sourceMeta: Record<SourceApp, { icon: string; label: string }> = {
  telegram: { icon: '✈️', label: 'Telegram' },
  discord: { icon: '🎮', label: 'Discord' },
  slack: { icon: '💼', label: 'Slack' },
  notification: { icon: '🔔', label: 'Notification' }
};

export function SourceBadge({ sourceApp }: { sourceApp: SourceApp }) {
  const meta = sourceMeta[sourceApp];
  return (
    <View style={styles.badge}>
      <Text style={styles.icon}>{meta.icon}</Text>
      <Text style={styles.text}>{meta.label}</Text>
    </View>
  );
}

export function sourceLabel(sourceApp: SourceApp): string {
  return sourceMeta[sourceApp].label;
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.12)'
  },
  icon: { fontSize: 12 },
  text: { color: theme.colors.textSecondary, fontSize: 11, fontWeight: '600' }
});
