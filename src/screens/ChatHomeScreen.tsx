import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SourceBadge } from '../components/SourceBadge';
import { AggregatedConversation, buildConversationList, fetchAllMessages } from '../services/messageAggregator';
import { Badge } from '../ui/components/Badge';
import { Card } from '../ui/components/Card';
import { theme } from '../ui/theme';

function formatRelative(ts: number) {
  const diffMs = Date.now() - ts;
  const diffMin = Math.max(1, Math.floor(diffMs / 60000));
  if (diffMin < 60) return `${diffMin}m`;
  const hours = Math.floor(diffMin / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

type MessagesNav = {
  navigate: (screen: 'Integrations' | 'Conversation', params?: { conversationId: string; sourceApp: import('../models/AggregatedMessage').SourceApp }) => void;
};

export function ChatHomeScreen() {
  const navigation = useNavigation<MessagesNav>();
  const [conversations, setConversations] = useState<AggregatedConversation[]>([]);

  useEffect(() => {
    async function load() {
      const messages = await fetchAllMessages();
      setConversations(buildConversationList(messages));
    }

    void load();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Messages</Text>
        <Pressable onPress={() => navigation.navigate('Integrations')} style={styles.settingsBtn}>
          <Text style={styles.settingsText}>Integrations</Text>
        </Pressable>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.conversationId}
        contentContainerStyle={{ gap: theme.spacing.sm }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('Conversation', { conversationId: item.conversationId, sourceApp: item.sourceApp })}
          >
            <Card>
              <View style={styles.row}>
                <Text style={styles.avatar}>{item.senderAvatar}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.senderName}</Text>
                  <Text style={styles.preview}>{item.preview}</Text>
                  <SourceBadge sourceApp={item.sourceApp} />
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <Text style={styles.time}>{formatRelative(item.timestamp)}</Text>
                  <Badge text={1} />
                </View>
              </View>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.md },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.sm },
  title: { ...theme.typography.titleLarge, color: theme.colors.textPrimary },
  settingsBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)'
  },
  settingsText: { color: theme.colors.textPrimary, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  avatar: { fontSize: 28 },
  name: { color: theme.colors.textPrimary, fontWeight: '700' },
  preview: { color: theme.colors.textSecondary, marginBottom: 4 },
  time: { color: theme.colors.textSecondary, fontSize: 12 }
});
