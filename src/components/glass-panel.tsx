import { BlurView } from 'expo-blur';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../constants/theme';

export function GlassPanel({ children }: PropsWithChildren) {
  return (
    <View style={styles.wrap}>
      <BlurView intensity={28} tint="light" style={styles.blur}>
        {children}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: theme.radius.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    backgroundColor: '#FFFFFF88'
  },
  blur: {
    padding: theme.spacing.md
  }
});
