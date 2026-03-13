import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type ReactionBurstProps = {
  emoji: string;
  x: number;
  y: number;
  onDone: () => void;
};

export function ReactionBurst({ emoji, x, y, onDone }: ReactionBurstProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(
      1,
      { duration: 1200, easing: Easing.out(Easing.cubic) },
      (finished) => finished && runOnJS(onDone)()
    );
  }, [onDone, progress]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: -progress.value * 80 }, { scale: 1 + progress.value * 0.3 }],
    opacity: 1 - progress.value
  }));

  return (
    <Animated.View style={[styles.item, { left: x, top: y }, style]}>
      <Text style={styles.emoji}>{emoji}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    position: 'absolute'
  },
  emoji: {
    fontSize: 28
  }
});
