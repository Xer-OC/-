import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Smile } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlassButton } from '../../components/GlassButton';
import { GlassCard } from '../../components/GlassCard';
import { decryptMessage, encryptMessage, EncryptedMessagePayload } from '../../crypto/messageEncryption';
import { ensureUserKeyPair, generateKeyPair } from '../../crypto/keyManager';
import { exchangePublicKeys, getPublicKeyForUser } from '../../services/keyExchangeService';
import { backgrounds } from '../../ui/backgrounds';
import { Input } from '../../ui/components/Input';
import { theme } from '../../ui/theme';

const CURRENT_USER_ID = 'you';
const ROOM_BOT_ID = 'room-bot';

type RoomMessage = {
  id: string;
  senderId: string;
  text: string;
  encrypted?: EncryptedMessagePayload;
};

export function RoomViewScreen() {
  const [roomEncrypted, setRoomEncrypted] = useState(true);
  const [composer, setComposer] = useState('');
  const [mySecretKey, setMySecretKey] = useState<string | null>(null);
  const [botSecretKey, setBotSecretKey] = useState<string | null>(null);
  const [messages, setMessages] = useState<RoomMessage[]>([{ id: 'default-1', senderId: ROOM_BOT_ID, text: '✨ Luna reacted with 🚀.' }]);

  useEffect(() => {
    async function setup() {
      const myKeys = await ensureUserKeyPair();
      const botKeys = generateKeyPair();
      exchangePublicKeys([
        { userId: CURRENT_USER_ID, publicKey: myKeys.publicKey },
        { userId: ROOM_BOT_ID, publicKey: botKeys.publicKey }
      ]);
      setMySecretKey(myKeys.secretKey);
      setBotSecretKey(botKeys.secretKey);
    }

    void setup();
  }, []);

  const sendMessage = () => {
    if (!composer.trim()) return;

    if (roomEncrypted && mySecretKey) {
      const roomPublicKey = getPublicKeyForUser(ROOM_BOT_ID);
      if (!roomPublicKey) return;

      const encrypted = encryptMessage(composer.trim(), roomPublicKey, mySecretKey, {
        id: `room-out-${Date.now()}`,
        senderId: CURRENT_USER_ID
      });
      setMessages((prev) => [...prev, { id: encrypted.id, senderId: CURRENT_USER_ID, text: composer.trim(), encrypted }]);

      if (botSecretKey) {
        const myPublic = getPublicKeyForUser(CURRENT_USER_ID);
        if (myPublic) {
          const inboundEncrypted = encryptMessage('Room update received securely.', myPublic, botSecretKey, {
            id: `room-in-${Date.now()}`,
            senderId: ROOM_BOT_ID
          });
          const decrypted = decryptMessage(inboundEncrypted, getPublicKeyForUser(ROOM_BOT_ID) ?? '', mySecretKey);
          if (decrypted) {
            setMessages((prev) => [...prev, { id: inboundEncrypted.id, senderId: ROOM_BOT_ID, text: decrypted, encrypted: inboundEncrypted }]);
          }
        }
      }
    } else {
      setMessages((prev) => [...prev, { id: `room-text-${Date.now()}`, senderId: CURRENT_USER_ID, text: composer.trim() }]);
    }

    setComposer('');
  };

  return (
    <LinearGradient colors={backgrounds.midnight} style={styles.container}>
      <View pointerEvents="none" style={styles.depthBackGlow} />
      <View pointerEvents="none" style={styles.depthMidGlow} />

      <GlassCard style={styles.videoPanel} depthLevel={0.6}>
        <Text style={styles.videoText}>▶️ Live Watch Party Stream</Text>
      </GlassCard>

      <GlassCard style={styles.chatArea} depthLevel={1}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Room Chat</Text>
          <GlassButton label={roomEncrypted ? 'E2EE On' : 'E2EE Off'} onPress={() => setRoomEncrypted((prev) => !prev)} />
        </View>

        <GlassCard style={styles.memberList} padding={10} depthLevel={0}>
          <Text style={styles.metaTool}>Members: Ava • Noah • Luna</Text>
          <Text style={styles.metaTool}>Reactions: 😀 🔥 🚀</Text>
        </GlassCard>

        <ScrollView style={styles.messagesList} contentContainerStyle={styles.messagesContent}>
          {messages.map((message) => (
            <View key={message.id} style={message.senderId === CURRENT_USER_ID ? styles.myBubble : styles.otherBubble}>
              <Text style={styles.msg}>{message.text}</Text>
              {message.encrypted ? <Text style={styles.meta}>nonce: {message.encrypted.nonce.slice(0, 10)}...</Text> : null}
            </View>
          ))}
        </ScrollView>

        <GlassCard style={styles.inputBar} padding={10} depthLevel={0}>
          <View style={styles.inputRow}>
            <MessageCircle size={18} color={theme.colors.textSecondary} />
            <Input placeholder="Message" value={composer} onChangeText={setComposer} style={{ flex: 1 }} />
            <Smile size={18} color={theme.colors.textSecondary} />
            <GlassButton label="✨" onPress={() => undefined} />
            <GlassButton label="Send" onPress={sendMessage} />
          </View>
        </GlassCard>
      </GlassCard>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md, gap: theme.spacing.sm + 4 },
  depthBackGlow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(56,189,248,0.12)',
    top: 40,
    left: -40
  },
  depthMidGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(167,139,250,0.12)',
    right: -30,
    bottom: 180
  },
  videoPanel: {
    flex: 0.52,
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoText: { color: theme.colors.textPrimary, fontWeight: '700' },
  chatArea: { flex: 0.48, gap: theme.spacing.sm },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: theme.colors.textPrimary, fontWeight: '700' },
  memberList: { marginBottom: 4 },
  metaTool: { color: theme.colors.textSecondary, fontSize: 12 },
  messagesList: { flex: 1 },
  messagesContent: { gap: 8, paddingBottom: 8 },
  myBubble: { alignSelf: 'flex-end', backgroundColor: 'rgba(147,197,253,0.24)', borderRadius: 12, padding: 10, maxWidth: '85%' },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15,23,42,0.5)',
    borderRadius: 12,
    padding: 10,
    maxWidth: '85%'
  },
  msg: { color: theme.colors.textPrimary },
  meta: { color: theme.colors.textSecondary, fontSize: 10, marginTop: 3 },
  inputBar: { marginTop: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8 }
});
