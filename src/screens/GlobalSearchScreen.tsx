import { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SourceBadge } from '../components/SourceBadge';
import { rooms, videos } from '../data/mock';
import { AggregatedMessage } from '../models/AggregatedMessage';
import { fetchAllMessages } from '../services/messageAggregator';
import { clearMessageIndex, indexMessage, searchMessages } from '../services/messageSearchService';
import { Card } from '../ui/components/Card';
import { theme } from '../ui/theme';
import { mockServer } from '../api/mockServer';

export function GlobalSearchScreen() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<AggregatedMessage[]>([]);

  useEffect(() => {
    async function load() {
      const aggregated = await fetchAllMessages();
      clearMessageIndex();
      aggregated.forEach(indexMessage);
    }

    void load();
  }, []);

  useEffect(() => {
    setMessages(searchMessages(query));
  }, [query]);

  const users = useMemo(
    () => mockServer.users.filter((user) => user.displayName.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  const roomResults = useMemo(() => rooms.filter((room) => room.name.toLowerCase().includes(query.toLowerCase())), [query]);
  const videoResults = useMemo(() => videos.filter((video) => video.title.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Global Search</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search messages, users, rooms, videos"
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
      />

      <FlatList
        data={[{ key: 'Messages' }, { key: 'Users' }, { key: 'Rooms' }, { key: 'Videos' }]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.key}</Text>
            {item.key === 'Messages' &&
              messages.map((message) => (
                <Card key={message.id} style={styles.card}>
                  <Text style={styles.rowText}>{message.senderAvatar} {message.senderName}: {message.content}</Text>
                  <SourceBadge sourceApp={message.sourceApp} />
                </Card>
              ))}
            {item.key === 'Users' &&
              users.map((user) => (
                <Card key={user.id} style={styles.card}>
                  <Text style={styles.rowText}>{user.avatar} {user.displayName}</Text>
                </Card>
              ))}
            {item.key === 'Rooms' &&
              roomResults.map((room) => (
                <Card key={room.id} style={styles.card}>
                  <Text style={styles.rowText}>{room.avatar} {room.name}</Text>
                </Card>
              ))}
            {item.key === 'Videos' &&
              videoResults.map((video) => (
                <Card key={video.id} style={styles.card}>
                  <Text style={styles.rowText}>{video.avatar} {video.title}</Text>
                </Card>
              ))}
            {item.key === 'Messages' && messages.length === 0 ? <Text style={styles.empty}>No results.</Text> : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md, backgroundColor: theme.colors.background },
  title: { ...theme.typography.titleLarge, color: theme.colors.textPrimary, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    color: theme.colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: theme.colors.surface
  },
  section: { marginBottom: 14 },
  sectionTitle: { color: theme.colors.textPrimary, fontWeight: '700', marginBottom: 6 },
  card: { marginBottom: 6 },
  rowText: { color: theme.colors.textPrimary },
  empty: { color: theme.colors.textSecondary }
});
