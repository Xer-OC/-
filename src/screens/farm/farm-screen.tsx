import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Package, Sprout, Users } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FarmCard } from '../../components/farm-card';
import { GlassButton } from '../../components/GlassButton';
import { GlassCard } from '../../components/GlassCard';
import { GlassModal } from '../../components/GlassModal';
import { mockServer } from '../../api/mockServer';
import { getFriends } from '../../services/friendService';
import { backgrounds } from '../../ui/backgrounds';
import { theme } from '../../ui/theme';

export function FarmScreen() {
  const navigation = useNavigation();
  const [showInviteList, setShowInviteList] = useState(false);
  const friends = getFriends(mockServer.currentUserId);

  return (
    <LinearGradient colors={backgrounds.sunset} style={styles.container}>
      <View pointerEvents="none" style={styles.skyLayer} />
      <View pointerEvents="none" style={styles.terrainLayer} />
      <View pointerEvents="none" style={styles.cropLayer} />

      <GlassCard depthLevel={0.7}>
        <FarmCard />
      </GlassCard>

      <GlassCard depthLevel={0.95}>
        <Text style={styles.sectionTitle}>Farm Controls</Text>
        <View style={styles.row}>
          <GlassButton label="Farm Detail" icon={<Sprout size={16} color={theme.colors.textPrimary} />} onPress={() => navigation.navigate('FarmDetail' as never)} style={styles.btn} />
          <GlassButton label="Inventory" icon={<Package size={16} color={theme.colors.textPrimary} />} onPress={() => navigation.navigate('Inventory' as never)} style={styles.btn} />
        </View>
        <GlassButton label="Invite Friend to Farm" icon={<Users size={16} color={theme.colors.textPrimary} />} onPress={() => setShowInviteList(true)} />
      </GlassCard>

      <GlassModal visible={showInviteList} onClose={() => setShowInviteList(false)}>
        <Text style={styles.modalTitle}>Invite Friends</Text>
        {friends.length ? (
          friends.map((entry) =>
            entry ? (
              <Text key={entry.friendship.id} style={styles.inviteRow}>
                {entry.user.avatar} Invite {entry.user.username}
              </Text>
            ) : null
          )
        ) : (
          <Text style={styles.inviteRow}>No friends available yet.</Text>
        )}
      </GlassModal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md, gap: theme.spacing.sm + 6 },
  skyLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(125,211,252,0.12)'
  },
  terrainLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '45%',
    backgroundColor: 'rgba(22,101,52,0.14)'
  },
  cropLayer: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(74,222,128,0.12)',
    top: 180,
    right: -30
  },
  sectionTitle: { color: theme.colors.textPrimary, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', gap: theme.spacing.sm + 2, marginBottom: 10 },
  btn: { flex: 1 },
  modalTitle: { color: theme.colors.textPrimary, fontWeight: '700', marginBottom: 10, fontSize: 16 },
  inviteRow: { color: theme.colors.textPrimary, marginBottom: 8 }
});
