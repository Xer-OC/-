import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { RoomCard } from '../../components/room-card';
import { rooms } from '../../data/mock';
import { getFriends } from '../../services/friendService';
import { theme } from '../../ui/theme';
import { mockServer } from '../../api/mockServer';
import { useState } from 'react';

export function RoomListScreen() {
  const navigation = useNavigation();
  const [invitesOpen, setInvitesOpen] = useState(false);
  const friends = getFriends(mockServer.currentUserId);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Join a room to watch together and chat in real time.</Text>
      <Pressable style={styles.inviteButton} onPress={() => setInvitesOpen((prev) => !prev)}>
        <Text style={styles.inviteText}>Invite Friend</Text>
      </Pressable>
      {invitesOpen ? (
        <View style={styles.invitePanel}>
          {friends.map((entry) =>
            entry ? (
              <Text key={entry.friendship.id} style={styles.inviteRow}>
                {entry.user.avatar} {entry.user.username}
              </Text>
            ) : null
          )}
        </View>
      ) : null}
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: theme.spacing.sm + 4, paddingBottom: theme.spacing.md }}
        renderItem={({ item }) => <RoomCard room={item} onJoin={() => navigation.navigate('SpatialRoom' as never)} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md, backgroundColor: theme.colors.background },
  subtitle: { color: theme.colors.textSecondary, marginBottom: theme.spacing.sm + 4 },
  inviteButton: {
    marginBottom: theme.spacing.sm,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    alignItems: 'center'
  },
  inviteText: { color: theme.colors.textPrimary, fontWeight: '600' },
  invitePanel: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm
  },
  inviteRow: { color: theme.colors.textPrimary, marginBottom: theme.spacing.xs }
});
