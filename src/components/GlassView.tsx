import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren, useMemo, useState } from 'react';
import { Platform, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { GLASS_BLUR, GLASS_BORDER, GLASS_OPACITY, GLASS_RADIUS, GLASS_SHADOW } from '../ui/glass';
import { accentLight, ambientLight, topLight } from '../ui/lightSystem';

type GlassViewProps = PropsWithChildren<{
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  radius?: number;
  padding?: number;
  style?: StyleProp<ViewStyle>;
}>;

export function GlassView({
  children,
  intensity = GLASS_BLUR,
  tint = 'light',
  radius = GLASS_RADIUS,
  padding = 14,
  style
}: GlassViewProps) {
  const [isInteractiveLight, setIsInteractiveLight] = useState(false);
  const glow = useSharedValue(0);

  const effectiveIntensity = useMemo(() => Math.min(100, intensity + (isInteractiveLight ? 8 : 0)), [intensity, isInteractiveLight]);

  const interactiveStyle = useAnimatedStyle(() => ({
    opacity: 0.15 + glow.value * 0.25
  }));

  const onLightIn = () => {
    setIsInteractiveLight(true);
    glow.value = withTiming(1, { duration: 160 });
  };

  const onLightOut = () => {
    setIsInteractiveLight(false);
    glow.value = withTiming(0, { duration: 200 });
  };

  return (
    <Pressable onHoverIn={onLightIn} onHoverOut={onLightOut} onPressIn={onLightIn} onPressOut={onLightOut}>
      <View style={[styles.shell, { borderRadius: radius }, style]}>
        <BlurView intensity={effectiveIntensity} tint={tint} style={[styles.blur, { borderRadius: radius }]}> 
          <LinearGradient
            colors={ambientLight.colors}
            start={ambientLight.start}
            end={ambientLight.end}
            style={[styles.overlay, { borderRadius: radius, padding }]}
          >
            <LinearGradient
              pointerEvents="none"
              colors={topLight.colors}
              start={topLight.start}
              end={topLight.end}
              style={[styles.lightOverlay, { borderRadius: radius }]}
            />
            <LinearGradient
              pointerEvents="none"
              colors={accentLight.colors}
              start={accentLight.start}
              end={accentLight.end}
              style={[styles.accentOverlay, { borderRadius: radius }]}
            />
            <Animated.View pointerEvents="none" style={[styles.interactiveGlow, interactiveStyle]} />
            {children}
          </LinearGradient>
        </BlurView>
        <View pointerEvents="none" style={[styles.highlight, { borderRadius: radius }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shell: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    backgroundColor: `rgba(15, 23, 42, ${GLASS_OPACITY * 0.35})`,
    ...GLASS_SHADOW
  },
  blur: {
    overflow: 'hidden'
  },
  overlay: {
    minHeight: 10
  },
  lightOverlay: {
    ...StyleSheet.absoluteFillObject
  },
  accentOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8
  },
  interactiveGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.45)'
  },
  highlight: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: Platform.select({ ios: 0.8, default: 1 }),
    borderColor: 'rgba(255,255,255,0.3)'
  }
});
