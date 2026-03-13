import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { mockServer } from '../api/mockServer';
import { AvatarBubble } from '../components/AvatarBubble';
import { GlassButton } from '../components/GlassButton';
import { GlassCard } from '../components/GlassCard';
import { ReactionBurst } from '../components/ReactionBurst';
import { Seat } from '../models/Seat';
import { SpatialRoom } from '../models/SpatialRoom';
import { backgrounds } from '../ui/backgrounds';
import { theme } from '../ui/theme';
import { generateCircleLayout, generateGridLayout, generateTheaterLayout } from '../utils/seatLayout';

type Reaction = { id: string; emoji: string; x: number; y: number };

const roomConfig: SpatialRoom = {
  id: 'spatial-room-1',
  roomId: 'room-1',
  layoutType: 'circle',
  maxSeats: 12
};

export function SpatialRoomScreen() {
  const [layoutType, setLayoutType] = useState<SpatialRoom['layoutType']>(roomConfig.layoutType);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [speakingUserId, setSpeakingUserId] = useState<string | null>(null);
  const [videoTs, setVideoTs] = useState(95);

  const participants = useMemo(() => mockServer.users.slice(0, roomConfig.maxSeats), []);

  const seats: Seat[] = useMemo(() => {
    const ids = participants.map((user) => user.id);
    if (layoutType === 'grid') return generateGridLayout(roomConfig.roomId, ids, 4, 82, 78);
    if (layoutType === 'theater') return generateTheaterLayout(roomConfig.roomId, ids, 4, 66, 86);
    return generateCircleLayout(roomConfig.roomId, ids, 132);
  }, [layoutType, participants]);

  const seatByUserId = useMemo(() => new Map(seats.map((seat) => [seat.userId, seat])), [seats]);

  const addReaction = (emoji: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setReactions((prev) => [...prev, { id, emoji, x: 170 + Math.random() * 60, y: 250 + Math.random() * 40 }]);
  };

  const removeReaction = (id: string) => setReactions((prev) => prev.filter((item) => item.id !== id));

  const syncToParticipants = (nextTs: number) => {
    setVideoTs(nextTs);
  };

  const onSendChat = () => {
    setSpeakingUserId(mockServer.currentUserId);
    setTimeout(() => setSpeakingUserId(null), 1200);
    addReaction('💬');
  };

  return (
    <LinearGradient colors={backgrounds.midnight} style={styles.screen}>
      <View pointerEvents="none" style={styles.bgGlowOne} />
      <View pointerEvents="none" style={styles.bgGlowTwo} />

      <View style={styles.spatialCanvas}>
        <GlassCard style={styles.videoCenter} depthLevel={0.25}>
          <Text style={styles.videoTitle}>🎬 Shared Video</Text>
          <Text style={styles.videoMeta}>Owner Sync Timestamp: {videoTs}s</Text>
          <View style={styles.videoControls}>
            <GlassButton label="-10s" onPress={() => syncToParticipants(Math.max(0, videoTs - 10))} />
            <GlassButton label="+10s" onPress={() => syncToParticipants(videoTs + 10)} />
          </View>
        </GlassCard>

        {participants.map((user) => {
          const seat = seatByUserId.get(user.id);
          if (!seat) return null;
          const isOnline = true;
          return (
            <View
              key={user.id}
              style={[
                styles.seat,
                {
                  transform: [{ translateX: seat.positionX }, { translateY: seat.positionY }, { rotate: `${seat.angle}deg` }]
                }
              ]}
            >
              <AvatarBubble
                user={user}
                isOnline={isOnline}
                isSpeaking={speakingUserId === user.id}
                onPress={() => Alert.alert(user.displayName, `${user.username}\nSeat: ${seat.seatId}`)}
                onLongPress={() =>
                  Alert.alert('Member Actions', `Choose an action for ${user.displayName}`, [
                    { text: 'Send Message', onPress: () => setSpeakingUserId(user.id) },
                    { text: 'View Profile' },
                    { text: 'Invite to Farm' },
                    { text: 'Cancel', style: 'cancel' }
                  ])
                }
              />
            </View>
          );
        })}

        <View pointerEvents="box-none" style={styles.reactionLayer}>
          {reactions.map((item) => (
            <ReactionBurst key={item.id} emoji={item.emoji} x={item.x} y={item.y} onDone={() => removeReaction(item.id)} />
          ))}
        </View>
      </View>

      <GlassCard style={styles.memberPanel} depthLevel={0}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.memberList}>
          {participants.map((user) => (
            <Pressable key={user.id} onPress={() => setSpeakingUserId(user.id)}>
              <Text style={styles.memberChip}>{user.avatar} {user.displayName}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </GlassCard>

      <GlassCard style={styles.chatPanel} depthLevel={0}>
        <Text style={styles.chatTitle}>Spatial Chat</Text>
        <View style={styles.chatActions}>
          <GlassButton label="Send Message" onPress={onSendChat} />
          <GlassButton label="😀" onPress={() => addReaction('😀')} />
          <GlassButton label="🔥" onPress={() => addReaction('🔥')} />
          <GlassButton label="🚀" onPress={() => addReaction('🚀')} />
        </View>
        <View style={styles.layoutRow}>
          <GlassButton label="Circle" onPress={() => setLayoutType('circle')} />
          <GlassButton label="Theater" onPress={() => setLayoutType('theater')} />
          <GlassButton label="Grid" onPress={() => setLayoutType('grid')} />
        </View>
      </GlassCard>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: theme.spacing.md, gap: 12 },
  bgGlowOne: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(125,211,252,0.12)',
    left: -40,
    top: 80
  },
  bgGlowTwo: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: 'rgba(244,114,182,0.1)',
    right: -30,
    top: 220
  },
  spatialCanvas: {
    flex: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoCenter: {
    position: 'absolute',
    width: 220,
    alignItems: 'center',
    zIndex: 2
  },
  videoTitle: { color: theme.colors.textPrimary, fontWeight: '700', fontSize: 16 },
  videoMeta: { color: theme.colors.textSecondary, marginTop: 6, marginBottom: 10 },
  videoControls: { flexDirection: 'row', gap: 8 },
  seat: {
    position: 'absolute',
    zIndex: 3
  },
  reactionLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 4
  },
  memberPanel: {
    minHeight: 64
  },
  memberList: {
    gap: 8
  },
  memberChip: {
    color: theme.colors.textPrimary,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  chatPanel: {
    zIndex: 5
  },
  chatTitle: {
    color: theme.colors.textPrimary,
    fontWeight: '700',
    marginBottom: 10
  },
  chatActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8
  },
  layoutRow: {
    flexDirection: 'row',
    gap: 8
  }
});
