import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { User } from '../models/User';
import { theme } from '../ui/theme';

type AvatarBubbleProps = {
  user: User;
  isOnline?: boolean;
  isSpeaking?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};

export const AvatarBubble = memo(function AvatarBubble({
  user,
  isOnline = false,
  isSpeaking = false,
  onPress,
  onLongPress
}: AvatarBubbleProps) {
  const pulse = useSharedValue(1);
  pulse.value = isSpeaking ? withRepeat(withTiming(1.18, { duration: 700 }), -1, true) : withTiming(1, { duration: 150 });

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: isSpeaking ? 0.35 : 0
  }));

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.wrap}>
      <Animated.View style={[styles.pulseRing, pulseStyle]} />
      <View style={styles.avatarCircle}>
        <Text style={styles.avatar}>{user.avatar}</Text>
        <View style={[styles.onlineDot, isOnline ? styles.online : styles.offline]} />
      </View>
      <Text style={styles.name}>{user.displayName}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', width: 74 },
  pulseRing: {
    position: 'absolute',
    top: 2,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(147,197,253,0.6)'
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)'
  },
  avatar: { fontSize: 24 },
  onlineDot: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff'
  },
  online: { backgroundColor: '#22C55E' },
  offline: { backgroundColor: '#94A3B8' },
  name: {
    marginTop: 5,
    color: theme.colors.textPrimary,
    fontSize: 11,
    textAlign: 'center'
  }
});
