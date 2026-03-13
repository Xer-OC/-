import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { starterFarm } from '../data/mock';
import { feedFarm } from '../utils/farm-engine';
import { theme } from '../ui/theme';
import { GlassButton } from './GlassButton';
import { GlassCard } from './GlassCard';

export function FarmCard() {
  const [farm, setFarm] = useState(starterFarm);
  const [coins, setCoins] = useState(0);
  const sparkle = useSharedValue(0);

  const onFeed = () => {
    setFarm((prev) => feedFarm(prev));
    setCoins((prev) => prev + 10);
    sparkle.value = 1;
    sparkle.value = withTiming(0, { duration: theme.animations.normal });
  };

  const sparkleStyle = useAnimatedStyle(() => ({ opacity: sparkle.value }));

  return (
    <View>
      <Text style={styles.title}>{farm.pet}</Text>
      <Text style={styles.meta}>Level {farm.level} • Owners: {farm.owners.join(', ')}</Text>
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${farm.growth}%` }]} />
      </View>
      <Text style={styles.meta}>Growth {farm.growth.toFixed(1)}%</Text>
      <Animated.Text entering={FadeInUp.duration(theme.animations.fast)} style={styles.coins}>
        +{coins} coins
      </Animated.Text>
      <Animated.Text style={[styles.sparkle, sparkleStyle]}>✨ growth sparkle</Animated.Text>
      <View style={styles.row}>
        <GlassButton label="Feed" onPress={onFeed} style={styles.btn} />
        <GlassButton label="Use Item" onPress={() => undefined} style={styles.btn} />
      </View>
      <GlassCard style={styles.inventoryPanel} padding={10}>
        <Text style={styles.stock}>Inventory • Food stock: {farm.foodStock}</Text>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.titleMedium, fontSize: 24, color: theme.colors.textPrimary, marginBottom: theme.spacing.sm },
  meta: { color: theme.colors.textSecondary, marginBottom: theme.spacing.sm },
  progressBg: { height: 12, borderRadius: 100, backgroundColor: 'rgba(15,23,42,0.5)', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: theme.colors.secondary, borderRadius: 100 },
  coins: { marginTop: theme.spacing.sm + 2, color: '#F59E0B', fontWeight: '600' },
  sparkle: { color: '#A78BFA', marginTop: theme.spacing.xs },
  row: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.sm + 6 },
  btn: { flex: 1 },
  inventoryPanel: { marginTop: theme.spacing.sm },
  stock: { color: theme.colors.textSecondary }
});
