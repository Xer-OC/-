import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ParallaxView } from './ParallaxView';
import { GlassView } from './GlassView';

type GlassCardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  padding?: number;
  depthLevel?: number;
}>;

export function GlassCard({ children, style, padding = 16, depthLevel = 0.8 }: GlassCardProps) {
  return (
    <ParallaxView depthLevel={depthLevel}>
      <GlassView style={style} padding={padding}>
        {children}
      </GlassView>
    </ParallaxView>
  );
}
