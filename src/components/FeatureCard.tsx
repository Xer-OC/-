import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { theme } from '../ui/theme';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  onPress: () => void;
  titleSize?: number;
  descriptionSize?: number;
};

export function FeatureCard({
  title,
  description,
  icon,
  onPress,
  titleSize = 18,
  descriptionSize = 14
}: FeatureCardProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withTiming(0.96, { duration: theme.animations.fast });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: theme.animations.fast });
      }}
      style={styles.pressable}
    >
      <Animated.View style={[styles.cardWrap, animatedStyle]}>
        <LinearGradient colors={['rgba(30,41,59,0.64)', 'rgba(17,24,39,0.82)']} style={styles.card}>
          <View style={styles.iconWrap}>{icon}</View>
          <Text style={[styles.title, { fontSize: titleSize }]}>{title}</Text>
          <Text style={[styles.description, { fontSize: descriptionSize }]}>{description}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: { flex: 1, minHeight: 176 },
  cardWrap: { flex: 1, borderRadius: theme.radius.lg, ...theme.shadows.card },
  card: {
    flex: 1,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    padding: 20,
    gap: theme.spacing.sm + 2
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)'
  },
  title: { color: theme.colors.textPrimary, fontWeight: '700' },
  description: { color: theme.colors.textSecondary, lineHeight: 20 }
});
