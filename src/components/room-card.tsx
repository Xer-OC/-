import { StyleSheet, Text, View } from 'react-native';
import { Room } from '../types/models';
import { theme } from '../ui/theme';
import { GlassButton } from './GlassButton';
import { GlassCard } from './GlassCard';

export function RoomCard({ room, onJoin }: { room: Room; onJoin: () => void }) {
  return (
    <GlassCard>
      <View style={styles.row}>
        <Text style={styles.avatar}>{room.avatar}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{room.name}</Text>
          <Text style={styles.meta}>
            {room.users} users • Playing: {room.nowPlaying}
          </Text>
        </View>
        <GlassButton label="Join" onPress={onJoin} />
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm + 2 },
  avatar: { fontSize: 28 },
  name: { fontWeight: '700', fontSize: 18, color: theme.colors.textPrimary },
  meta: { color: theme.colors.textSecondary, marginTop: 2, maxWidth: 200 }
});
