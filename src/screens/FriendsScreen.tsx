import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { mockServer } from '../api/mockServer';
import { Avatar } from '../ui/components/Avatar';
import { Button } from '../ui/components/Button';
import { Card } from '../ui/components/Card';
import { Input } from '../ui/components/Input';
import { theme } from '../ui/theme';
import { acceptFriendRequest, getFriends, getPendingRequests, rejectFriendRequest, sendFriendRequest } from '../services/friendService';
import { isFriend, isRequestPending } from '../utils/friendUtils';

type TabKey = 'friends' | 'requests' | 'discover';

export function FriendsScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('friends');
  const [search, setSearch] = useState('');
  const [refreshToken, setRefreshToken] = useState(0);

  const myId = mockServer.currentUserId;
  const friends = useMemo(() => getFriends(myId), [myId, refreshToken]);
  const requests = useMemo(() => getPendingRequests(myId), [myId, refreshToken]);

  const discoverUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return mockServer.users.filter((user) => {
      if (user.id === myId) return false;
      if (term && !user.username.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [search, myId, refreshToken]);

  const refresh = () => setRefreshToken((prev) => prev + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <View style={styles.tabRow}>
        {(['friends', 'requests', 'discover'] as TabKey[]).map((tab) => (
          <Pressable key={tab} onPress={() => setActiveTab(tab)} style={[styles.tabPill, activeTab === tab && styles.activePill]}>
            <Text style={styles.tabLabel}>{tab[0].toUpperCase() + tab.slice(1)}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
        {activeTab === 'friends' ? (
          <View style={styles.section}>
            {friends.map((entry) => {
              if (!entry) return null;
              return (
                <Card key={entry.friendship.id} style={styles.cardGap}>
                  <View style={styles.row}>
                    <Avatar label={entry.user.avatar} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.name}>{entry.user.username}</Text>
                      <Text style={styles.meta}>{entry.presence}</Text>
                    </View>
                    <Button title="Message" style={styles.smallBtn} />
                    <Button title="Invite" variant="secondary" style={styles.smallBtn} />
                  </View>
                </Card>
              );
            })}
          </View>
        ) : null}

        {activeTab === 'requests' ? (
          <View style={styles.section}>
            {requests.map((entry) => (
              <Card key={entry.request.id} style={styles.cardGap}>
                <View style={styles.row}>
                  <Avatar label={entry.requester?.avatar ?? '🙂'} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{entry.requester?.username}</Text>
                    <Text style={styles.meta}>wants to connect</Text>
                  </View>
                  <Button
                    title="Accept"
                    style={styles.smallBtn}
                    onPress={() => {
                      acceptFriendRequest(entry.request.id);
                      refresh();
                    }}
                  />
                  <Button
                    title="Reject"
                    variant="secondary"
                    style={styles.smallBtn}
                    onPress={() => {
                      rejectFriendRequest(entry.request.id);
                      refresh();
                    }}
                  />
                </View>
              </Card>
            ))}
          </View>
        ) : null}

        {activeTab === 'discover' ? (
          <View style={styles.section}>
            <Input placeholder="Search users" value={search} onChangeText={setSearch} />
            {discoverUsers.map((user) => {
              const friend = isFriend(myId, user.id);
              const pending = isRequestPending(myId, user.id);

              return (
                <Card key={user.id} style={styles.cardGap}>
                  <View style={styles.row}>
                    <Avatar label={user.avatar} />
                    <Text style={[styles.name, { flex: 1 }]}>{user.username}</Text>
                    <Button
                      title={friend ? 'Friend' : pending ? 'Pending' : 'Add Friend'}
                      disabled={friend || pending}
                      onPress={() => {
                        sendFriendRequest(myId, user.id);
                        refresh();
                      }}
                      style={styles.addBtn}
                    />
                  </View>
                </Card>
              );
            })}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.md },
  title: { ...theme.typography.titleLarge, color: theme.colors.textPrimary, marginBottom: theme.spacing.sm },
  tabRow: { flexDirection: 'row', gap: theme.spacing.sm, marginBottom: theme.spacing.md },
  tabPill: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface
  },
  activePill: { backgroundColor: '#1E293B' },
  tabLabel: { color: theme.colors.textPrimary, fontWeight: '600' },
  section: { gap: theme.spacing.sm },
  cardGap: { marginBottom: theme.spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  name: { color: theme.colors.textPrimary, fontWeight: '600' },
  meta: { color: theme.colors.textSecondary, textTransform: 'capitalize' },
  smallBtn: { paddingHorizontal: theme.spacing.sm, minWidth: 78 },
  addBtn: { minWidth: 110 }
});
