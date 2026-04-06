import { StyleSheet, Text, View } from 'react-native';
import { mockServer } from '../api/mockServer';
import { sendFriendRequest } from '../services/friendService';
import { Button } from '../ui/components/Button';
import { theme } from '../ui/theme';
import { isFriend, isRequestPending } from '../utils/friendUtils';

export function ProfileScreen({ viewedUserId = 'ava' }: { viewedUserId?: string }) {
  const currentUserId = mockServer.currentUserId;
  const user = mockServer.users.find((item) => item.id === viewedUserId);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>User not found</Text>
      </View>
    );
  }

  const viewingSelf = viewedUserId === currentUserId;
  const friend = isFriend(currentUserId, viewedUserId);
  const pending = isRequestPending(currentUserId, viewedUserId);

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>{user.avatar}</Text>
      <Text style={styles.name}>{user.username}</Text>
      {!viewingSelf ? (
        <Button
          title={friend ? 'Friends' : pending ? 'Request Pending' : 'Add Friend'}
          disabled={friend || pending}
          onPress={() => {
            sendFriendRequest(currentUserId, viewedUserId);
          }}
          style={{ marginTop: theme.spacing.md }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md
  },
  avatar: { fontSize: 56, marginBottom: theme.spacing.sm },
  name: { color: theme.colors.textPrimary, ...theme.typography.titleMedium }
});
