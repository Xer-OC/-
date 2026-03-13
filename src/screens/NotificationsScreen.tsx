import { FlatList, StyleSheet, Text, View } from 'react-native';
import { mockServer } from '../api/mockServer';
import { Card } from '../ui/components/Card';
import { theme } from '../ui/theme';

export function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={mockServer.notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: theme.spacing.sm }}>
            <Text style={styles.item}>{item.type}</Text>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notifications yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.md },
  title: { ...theme.typography.titleLarge, color: theme.colors.textPrimary, marginBottom: theme.spacing.sm },
  item: { color: theme.colors.textPrimary, textTransform: 'capitalize' },
  empty: { color: theme.colors.textSecondary }
});
