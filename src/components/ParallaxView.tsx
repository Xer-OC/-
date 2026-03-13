import { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useParallax } from '../utils/useParallax';

type ParallaxViewProps = PropsWithChildren<{
  depthLevel?: number;
  style?: StyleProp<ViewStyle>;
}>;

export function ParallaxView({ children, depthLevel = 1, style }: ParallaxViewProps) {
  const { animatedStyle, motionEnabled } = useParallax({ depthLevel });

  if (!motionEnabled || depthLevel <= 0) {
    return <View style={style}>{children}</View>;
  }

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}
