import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { GLASS_BORDER } from '../ui/glass';

type GlassNavIconProps = {
  focused: boolean;
  icon: ReactNode;
};

export function GlassNavBarBackground() {
  return (
    <View style={styles.wrap}>
      <BlurView intensity={24} tint="dark" style={styles.bg} />
    </View>
  );
}

export function GlassNavIcon({ focused, icon }: GlassNavIconProps) {
  const scale = useSharedValue(focused ? 1.06 : 1);
  scale.value = withTiming(focused ? 1.06 : 1, { duration: 160 });
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return <Animated.View style={[styles.iconBubble, focused && styles.iconFocused, animatedStyle]}>{icon}</Animated.View>;
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderColor: GLASS_BORDER,
    backgroundColor: 'rgba(15,23,42,0.5)'
  },
  bg: { flex: 1 },
  iconBubble: {
    padding: 6,
    borderRadius: 12
  },
  iconFocused: {
    backgroundColor: 'rgba(255,255,255,0.16)'
  }
});
