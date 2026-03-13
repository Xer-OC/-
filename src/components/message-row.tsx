import { StyleSheet, Text, View } from 'react-native';
import { InboxThread } from '../types/models';
import { Avatar } from '../ui/components/Avatar';
import { Badge } from '../ui/components/Badge';
import { Card } from '../ui/components/Card';
import { theme } from '../ui/theme';

export function MessageRow({ item }: { item: InboxThread }) {
  return (
    <Card>
      <View style={styles.row}>
        <Avatar label={item.avatar} size={36} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.preview}>{item.preview}</Text>
          <Text style={styles.platform}>{item.platform}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.time}>{item.time}</Text>
          {item.unread > 0 ? <Badge text={item.unread} style={{ marginTop: theme.spacing.xs + 2 }} /> : null}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm + 2 },
  name: { fontWeight: '700', color: theme.colors.textPrimary },
  preview: { color: theme.colors.textSecondary, marginTop: 2 },
  platform: { color: theme.colors.textSecondary, ...theme.typography.caption, marginTop: 2 },
  time: { color: theme.colors.textSecondary, ...theme.typography.caption }
});
