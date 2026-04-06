import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { theme } from '../theme';

export function Badge({ text, style }: { text: string | number; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: theme.colors.primary,
    minWidth: 22,
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 3,
    alignItems: 'center'
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: 12
  }
});
