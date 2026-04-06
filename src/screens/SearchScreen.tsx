import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input } from '../ui/components/Input';
import { theme } from '../ui/theme';
import { searchAll } from '../services/searchService';

export function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ users: { username: string }[]; rooms: { name: string }[]; farms: { pet: string }[]; videos: { title: string }[] } | null>(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
      <Text style={styles.title}>Global Search</Text>
      <Input placeholder="Search users, rooms, farms, videos" value={query} onChangeText={setQuery} />
      <Pressable
        style={styles.btn}
        onPress={async () => {
          const response = await searchAll(query);
          setResults(response as { users: { username: string }[]; rooms: { name: string }[]; farms: { pet: string }[]; videos: { title: string }[] });
        }}
      >
        <Text style={styles.btnText}>Search</Text>
      </Pressable>

      {results ? (
        <View style={styles.results}>
          <Text style={styles.section}>Users: {results.users.map((u) => u.username).join(', ') || 'None'}</Text>
          <Text style={styles.section}>Rooms: {results.rooms.map((r) => r.name).join(', ') || 'None'}</Text>
          <Text style={styles.section}>Farms: {results.farms.map((f) => f.pet).join(', ') || 'None'}</Text>
          <Text style={styles.section}>Videos: {results.videos.map((v) => v.title).join(', ') || 'None'}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.md },
  title: { ...theme.typography.titleLarge, color: theme.colors.textPrimary, marginBottom: theme.spacing.sm },
  btn: { marginTop: theme.spacing.sm, backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 10, alignItems: 'center' },
  btnText: { color: theme.colors.textPrimary, fontWeight: '600' },
  results: { marginTop: theme.spacing.md, gap: theme.spacing.sm },
  section: { color: theme.colors.textSecondary }
});
