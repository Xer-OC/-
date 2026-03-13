import { Paperclip, Smile } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SourceBadge, sourceLabel } from '../../components/SourceBadge';
import { AggregatedMessage, SourceApp } from '../../models/AggregatedMessage';
import { MessageSummary } from '../../models/MessageSummary';
import { fetchAllMessages, sendMessageThroughAdapter } from '../../services/messageAggregator';
import { summarizeConversation } from '../../services/messageSummaryService';
import { generateReplySuggestions } from '../../services/smartReplyService';
import { Input } from '../../ui/components/Input';
import { theme } from '../../ui/theme';

type ConversationParams = {
  Conversation: {
    conversationId?: string;
    sourceApp?: SourceApp;
  };
};

const CURRENT_USER_NAME = 'You';

export function ConversationScreen() {
  const route = useRoute<RouteProp<ConversationParams, 'Conversation'>>();
  const [composer, setComposer] = useState('');
  const [messages, setMessages] = useState<AggregatedMessage[]>([]);
  const [summary, setSummary] = useState<MessageSummary | null>(null);

  const conversationId = route.params?.conversationId;
  const sourceApp = route.params?.sourceApp;

  useEffect(() => {
    async function load() {
      const aggregated = await fetchAllMessages();
      const filtered = conversationId ? aggregated.filter((msg) => msg.conversationId === conversationId) : aggregated;
      setMessages(filtered);
    }

    void load();
  }, [conversationId]);

  const conversationSource = useMemo<SourceApp>(() => {
    return sourceApp ?? messages[0]?.sourceApp ?? 'telegram';
  }, [messages, sourceApp]);

  const suggestions = useMemo(() => {
    const latest = messages[0];
    if (!latest) return [];
    return generateReplySuggestions(latest);
  }, [messages]);

  const sendReply = async (textOverride?: string) => {
    const text = (textOverride ?? composer).trim();
    if (!text) return;

    const link = await sendMessageThroughAdapter(conversationSource, conversationId ?? 'unknown-conversation', text);

    const newMessage: AggregatedMessage = {
      id: `internal-ui-${Date.now()}`,
      conversationId: conversationId ?? 'unknown-conversation',
      senderName: CURRENT_USER_NAME,
      senderAvatar: '🧑‍🌾',
      content: text,
      timestamp: Date.now(),
      sourceApp: conversationSource,
      externalMessageId: link.externalMessageId
    };

    setMessages((prev) => [newMessage, ...prev]);
    setComposer('');
  };

  const loadSummary = async () => {
    const result = await summarizeConversation(conversationId ?? 'all');
    setSummary(result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.contact}>{messages[0]?.senderName ?? 'Conversation'}</Text>
        <SourceBadge sourceApp={conversationSource} />
      </View>

      <Pressable style={styles.summaryBtn} onPress={loadSummary}>
        <Text style={styles.summaryBtnText}>View Conversation Summary</Text>
      </Pressable>
      {summary ? <Text style={styles.summaryText}>{summary.summary_text}</Text> : null}

      {suggestions.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionRow}>
          {suggestions.map((suggestion) => (
            <Pressable key={suggestion} style={styles.suggestionChip} onPress={() => void sendReply(suggestion)}>
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      <View style={styles.thread}>
        {messages.map((message) => {
          const mine = message.senderName === CURRENT_USER_NAME;
          return (
            <View key={message.id} style={mine ? styles.me : styles.them}>
              <Text style={mine ? styles.meText : styles.themText}>{message.content}</Text>
              <Text style={styles.meta}>Sent via {sourceLabel(message.sourceApp)}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.inputBar}>
        <Input placeholder="Type message" value={composer} onChangeText={setComposer} style={{ flex: 1 }} />
        <Smile size={18} color={theme.colors.textSecondary} />
        <Paperclip size={18} color={theme.colors.textSecondary} />
        <Pressable style={styles.send} onPress={() => void sendReply()}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.md },
  header: { marginBottom: theme.spacing.sm, gap: 6 },
  contact: { fontWeight: '700', color: theme.colors.textPrimary },
  summaryBtn: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 8
  },
  summaryBtnText: { color: theme.colors.textPrimary, fontWeight: '600' },
  summaryText: { color: theme.colors.textSecondary, marginBottom: 8 },
  suggestionRow: { gap: 8, marginBottom: 8 },
  suggestionChip: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: 'rgba(255,255,255,0.12)' },
  suggestionText: { color: theme.colors.textPrimary, fontSize: 12 },
  thread: { flex: 1, gap: theme.spacing.sm, flexDirection: 'column-reverse' },
  me: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, padding: theme.spacing.sm + 4, alignSelf: 'flex-end', maxWidth: '85%' },
  meText: { color: theme.colors.textPrimary },
  them: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding: theme.spacing.sm + 4, alignSelf: 'flex-start', maxWidth: '85%', borderWidth: 1, borderColor: theme.colors.border },
  themText: { color: theme.colors.textPrimary },
  meta: { color: theme.colors.textSecondary, fontSize: 11, marginTop: 4 },
  inputBar: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.border,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.sm + 2,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center'
  },
  send: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.sm, paddingHorizontal: 10, paddingVertical: 6 },
  sendText: { color: theme.colors.textPrimary, fontWeight: '600', fontSize: 12 }
});
